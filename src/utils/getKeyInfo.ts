import { parse, types, print, run, visit, Options } from 'recast';
import * as Kinds from 'ast-types/gen/kinds';
import { NodePath } from 'ast-types/lib/node-path';
import { namedTypes } from 'ast-types/gen/namedTypes';
import * as fs from 'fs';
import { IProperty } from "./getInterface";

export default (filePath: string): { className: string; PropTypes: IProperty } => {
  const fileContent = fs.readFileSync(filePath).toString();

  const asts = parse(fileContent, {
    parser: require('recast/parsers/babylon')
  }).program.body;
  
  let className: string;
  // let PTName: string;
  const PropTypes: IProperty = {};

  // 判读是否为类的静态属性
  const isPropTypesProperty = (path: NodePath<namedTypes.ClassProperty>) => {
    return path.node.static && (path.node.key as Kinds.IdentifierKind).name === 'propTypes';
  }
  // 判断是否为静态属性
  const isStaticProperty = (path: NodePath<namedTypes.ClassProperty>): boolean => {
    return path.node.static;
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
        if (types.namedTypes.ObjectExpression.assert(node.value)) {
          const properties = node.value.properties;
          properties.forEach((property) => {
            if (types.namedTypes.ObjectProperty.assert(property)) {
              let propertyKey: string;
              if (types.namedTypes.Identifier.assert(property.key)) {
                propertyKey = property.key.name;
              }
              if (types.namedTypes.MemberExpression.assert(property.value)) {
                const lastProperty = (property.value.property as Kinds.IdentifierKind);
                if (lastProperty.name === 'isRequired') {
                  const preProperty = (property.value.object as Kinds.MemberExpressionKind).property;
                  PropTypes[propertyKey] = {
                    isRequired: true,
                    type: (preProperty as Kinds.IdentifierKind).name,
                  };
                } else {
                  PropTypes[propertyKey] = {
                    type: lastProperty.name,
                    isRequired: false,
                  };
                }
              }
            }
          });
        }
      }
      return false;
    },
  });
  
  return {
    className,
    PropTypes,
  };
}
