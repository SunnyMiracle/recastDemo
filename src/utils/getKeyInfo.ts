import { parse, types, print, run, visit, Options } from 'recast';
import * as Kinds from 'ast-types/gen/kinds';
import { NodePath } from 'ast-types/lib/node-path';
import { namedTypes } from 'ast-types/gen/namedTypes';
import * as fs from 'fs';
import { IProperty } from "./getInterface";

export interface IPropertyInfo {
  propertyKey: string;
  type: IPropertyInfo | string;
  childType?: IPropertyInfo[]; // instanceOf oneOf oneOfType arrayOf objectOf shape exact type为这几种的时候有值
  isRequired: boolean;
}


export default (filePath: string): { className: string; PropTypes: IPropertyInfo[] } => {
  const fileContent = fs.readFileSync(filePath).toString();

  const asts = parse(fileContent, {
    parser: require('recast/parsers/babylon')
  }).program.body;
  
  let className: string;
  // let PTName: string;
  let PropTypes: IPropertyInfo[] = [];

  // 判读是否为类的静态属性
  const isPropTypesProperty = (path: NodePath<namedTypes.ClassProperty>) => {
    return path.node.static && (path.node.key as Kinds.IdentifierKind).name === 'propTypes';
  }
  // 判断是否为静态属性
  const isStaticProperty = (path: NodePath<namedTypes.ClassProperty>): boolean => {
    return path.node.static;
  }
  
  // 遍历得出props定义
  const mapPropsInfo = (objectExpression: Kinds.ObjectExpressionKind): IPropertyInfo[] => {
    if (types.namedTypes.ObjectExpression.assert(objectExpression)) {
      const properties = objectExpression.properties;
      return properties.map((property) => {
        if (types.namedTypes.ObjectProperty.assert(property)) {
          let propertyKey: string;
          let type: string;
          let isRequired: boolean;
          let childType: IPropertyInfo[];
          if (types.namedTypes.Identifier.assert(property.key)) {
            propertyKey = property.key.name;
          }
          
          // 函数类型需要区分是否包含isRequired属性，包含 ==> MemberExpressionKind 不包含 ==> CallExpression
          if (types.namedTypes.CallExpression.check(property.value)) {
            isRequired = false;
            const callee = property.value.callee as types.namedTypes.MemberExpression;
            type = (callee.property as types.namedTypes.Identifier).name;
            const argus = property.value.arguments;
            childType = mapPropsInfo(argus[0] as types.namedTypes.ObjectExpression);
          }
          if (types.namedTypes.MemberExpression.check(property.value)) {
            const lastProperty = (property.value.property as Kinds.IdentifierKind);
            if (lastProperty.name === 'isRequired') {
              isRequired = true;
              if (types.namedTypes.CallExpression.check(property.value.object)) {
                const callee = property.value.object.callee as types.namedTypes.MemberExpression;
                type = (callee.property as types.namedTypes.Identifier).name;
                const argus = property.value.object.arguments;
                childType = mapPropsInfo(argus[0] as types.namedTypes.ObjectExpression);
              }
              if (types.namedTypes.MemberExpression.check(property.value.object)) {
                const preProperty = property.value.object.property;
                type = (preProperty as Kinds.IdentifierKind).name;
              }
            } else {
              type = lastProperty.name;
              isRequired = false;
            }
          }
          return {
            propertyKey,
            type,
            childType,
            isRequired,
          };
        }
      });
    }
    return [];
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
