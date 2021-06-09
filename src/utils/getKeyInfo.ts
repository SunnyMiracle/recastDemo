import { parse, types, visit } from 'recast';
import * as Kinds from 'ast-types/gen/kinds';
import { NodePath } from 'ast-types/lib/node-path';
import { namedTypes } from 'ast-types/gen/namedTypes';
import { TPropTypes } from './typeAnnotations';
import * as fs from 'fs';

// props 类型
export interface IProps {
  type: TPropTypes;
  args?: (instanceOfArgType | oneOfArgType | oneOfTypeArgType | objectOfArgType | shapeArgType)[];
  isRequired: boolean;
}

// 标识符类型instanceOf 参数
export type instanceOfArgType = string;
// oneOf 参数枚举类型
export type oneOfArgType = unknown[];
// oneOfType 参数类型
export type oneOfTypeArgType = IProps[];
// arrayOf objectOf 参数类型
export type objectOfArgType = IProps;
// shape exact 参数类型
export type shapeArgType = {
  [key: string]: IProps;
};

export default (filePath: string): { className: string; PropTypes: shapeArgType } => {
  const fileContent = fs.readFileSync(filePath).toString();

  const asts = parse(fileContent, {
    parser: require('recast/parsers/babylon')
  }).program.body;
  
  let className: string;
  let PropTypes: shapeArgType;

  // 判读是否为类的静态属性
  const isPropTypesProperty = (path: NodePath<namedTypes.ClassProperty>): boolean => {
    return path.node.static && (path.node.key as Kinds.IdentifierKind).name === 'propTypes';
  }
  // 判断是否为静态属性
  // const isStaticProperty = (path: NodePath<namedTypes.ClassProperty>): boolean => {
  //   return path.node.static;
  // }
  
  // 得出Props信息 内部子类工具函数
  const utils = {
    getMemberExpressionPropsInfo: (propsInfo: Kinds.MemberExpressionKind): IProps => {
      const lastProperty = (propsInfo.property as Kinds.IdentifierKind);
      if (lastProperty.name === 'isRequired') {
        let info;
        if (types.namedTypes.CallExpression.check(propsInfo.object)) {
          info = utils.getCallExpressionPropsInfo(propsInfo.object);
        }
        if (types.namedTypes.MemberExpression.check(propsInfo.object)) {
          const preProperty = propsInfo.object.property;
          info = {
            type: (preProperty as Kinds.IdentifierKind).name,
          }
        }
        return {
          ...info,
          isRequired: true,
        };
      }
      return {
        type: lastProperty.name,
        isRequired: false,
      }
    },
    getCallExpressionPropsInfo: (propsInfo: Kinds.CallExpressionKind): Pick<IProps, 'type' | 'args'> => {
      const callee = propsInfo.callee as types.namedTypes.MemberExpression;
      const type = (callee.property as types.namedTypes.Identifier).name;
      const arg = propsInfo.arguments[0]; // 只关心第一个入参，prop-types函数验证貌似也没有第二个参数
      const args = [];
      if (types.namedTypes.Identifier.check(arg)) {
        // 函数入参是一个标识符，一般instanceOf的入参是标识符，这个标识符指的是一个类。
        args.push(arg.name);
      }
      if (types.namedTypes.ArrayExpression.check(arg)) {
        // oneOf oneOfType的参数会是数组
        const values = [];
        arg.elements.forEach((item) => {
          if (types.namedTypes.MemberExpression.check(item)) {
            values.push(utils.getMemberExpressionPropsInfo(item));
          }
          if (types.namedTypes.CallExpression.check(item)) {
            values.push(utils.getCallExpressionPropsInfo(item));
          }
          if (
            types.namedTypes.StringLiteral.check(item) ||
            types.namedTypes.NumericLiteral.check(item) ||
            types.namedTypes.BooleanLiteral.check(item) // TODO 需要明确吗继续？
          ) {
            values.push(item.value);
          }
        });
        args.push(values);
      }
      if (types.namedTypes.MemberExpression.check(arg)) {
        // arrayOf objectOf 的参数是成员表达式
        args.push(utils.getMemberExpressionPropsInfo(arg))
      }
      if (types.namedTypes.ObjectExpression.check(arg)) {
        // shape exact 的参数是对象表达式
        args.push(mapPropsInfo(arg));
      }
      return {
        type,
        args
      };
    }
  }
  // 遍历得出props定义 处理对象类型的props定义。
  const mapPropsInfo = (objectExpression: Kinds.ObjectExpressionKind): shapeArgType => {
    if (types.namedTypes.ObjectExpression.check(objectExpression)) {
      const properties = objectExpression.properties;
      const result = {};
      properties.forEach((property) => {
        if (types.namedTypes.ObjectProperty.check(property)) {
          let propertyKey: string;
          if (types.namedTypes.Identifier.check(property.key)) {
            propertyKey = property.key.name;
          }
          // 函数类型需要区分是否包含isRequired属性，
          // 包含 ==> MemberExpressionKind 不包含 ==> CallExpression
          if (types.namedTypes.CallExpression.check(property.value)) {
            // 函数调用验证的props类型，并且不含有isRequired属性
            const info = utils.getCallExpressionPropsInfo(property.value);
            result[propertyKey] = {
              type: info.type,
              args: info.args,
              isRequired: false,
            };
          }
          if (types.namedTypes.MemberExpression.check(property.value)) {
            const info = utils.getMemberExpressionPropsInfo(property.value);
            result[propertyKey] = {
              type: info.type,
              args: info.args,
              isRequired: info.isRequired,
            };
          }
        }
      });
      return result;
    }
    return {};
  }
  
  visit(asts, {
    visitClassDeclaration(path): any {
      if (types.namedTypes.ClassDeclaration.assert(path.node)) {
        className = path.node.id.name;
      }
      // 遍历类名之后 还需要继续向内遍历属性等。
      this.traverse(path);
    },
    visitClassProperty(path): any {
      // 处理propTypes
      if (isPropTypesProperty(path)) {
        const node = path.node;
        PropTypes = mapPropsInfo(node.value as types.namedTypes.ObjectExpression);
      }
      return false;
    },
  });
  
  return {
    className,
    PropTypes,
  };
}
