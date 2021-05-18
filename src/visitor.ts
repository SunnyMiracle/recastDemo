import { parse, types, print, run, visit, Options } from 'recast';
import * as Kinds from 'ast-types/gen/kinds';
import { NodePath } from 'ast-types/lib/node-path';
import { namedTypes } from 'ast-types/gen/namedTypes';
import * as fs from 'fs';
import * as path from 'path';

const fileContent = fs.readFileSync(path.resolve(__dirname, '../files/index.jsx')).toString();
// console.log(fileContent)

const asts = parse(fileContent, {
  parser: require('recast/parsers/babylon')
}).program.body;

let className: string;
// let PTName: string;
const PropTypes: { [key: string]: object } = {};

// 判读是否为类的静态属性
const isPropTypesProperty = (path: NodePath<namedTypes.ClassProperty>) => {
  return path.node.static && (path.node.key as Kinds.IdentifierKind).name === 'propTypes';
}

visit(asts, {
  // visitImportDeclaration(path): any {
  //   if (path.node.source.value === 'prop-types') {
  //     PTName = path.node.specifiers[0].local.name;
  //   }
  //   return false;
  // },
  visitClassDeclaration(path): any {
    if (types.namedTypes.ClassDeclaration.assert(path.node)) {
      className = path.node.id.name;
    }
    // 遍历类名之后 还需要继续向内遍历属性等。
    this.traverse(path);
  },
  visitClassProperty(path): any {
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
              const obj = property.value.object;
              const lastProperty = (property.value.property as Kinds.IdentifierKind);
              // TODO 需要递归得出key值
              if (lastProperty.name === 'isRequired') {
                const preProperty = (property.value.object as Kinds.MemberExpressionKind).property;
                PropTypes[propertyKey] = {
                  isRequired: true,
                  type: (preProperty as Kinds.IdentifierKind).name,
                };
              } else {
                PropTypes[propertyKey] = {
                  type: lastProperty.name,
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

console.log(className, '\n', PropTypes);
