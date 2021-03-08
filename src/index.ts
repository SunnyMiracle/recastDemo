import { parse, types, print, run, visit, Options } from 'recast';

import * as fs from 'fs';
import * as path from 'path';

const fileContent = fs.readFileSync(path.resolve(__dirname, '../files/index.jsx')).toString();
// console.log(fileContent)

const asts = parse(fileContent, {
  parser: require('recast/parsers/flow')
}).program.body;


// asts.forEach((expression) => {
//   if (types.namedTypes.ClassDeclaration.check(expression)) {
//     console.log(expression);
//   }
// })

visit(asts, {
  // visitClassDeclaration(path): any {
  //   // console.log(path, 'class');
  //   this.traverse(path);
  // },
  // visitClassProperty(...res): any {
  //   console.log(res);
  //   return false;
  // }
  // visitVariableDeclaration(path): any {
  //   const declaration = path.node.declarations[0];
  //   // @ts-ignore
  //   const name = declaration.id.name;
  //   if (name === 'name') {
  //     this.traverse(path);
  //   }
  //   console.log(name);
  //   return false;
  // }
});

const builders = types.builders;

const printF = (nodes) => {
  console.log(print(nodes).code);
}

// const id = types.builders.identifier('name');
// const body = types.builders.tsInterfaceBody([
//   builders.tsConstructSignatureDeclaration.from({
//     parameters: [builders.identifier('gender')],
//   }),
//   builders.tsCallSignatureDeclaration.from({
//     parameters: [builders.identifier('age')],
//     typeAnnotation: builders.tsTypeAnnotation(builders.tsBooleanKeyword()),
//     typeParameters: builders.tsTypeParameterDeclaration.from({
//       params: [builders.tsTypeParameter('age', builders.tsStringKeyword())]
//     }),
//   }),
//   builders.tsPropertySignature.from({
//     key: builders.identifier('aaa'),
//     typeAnnotation: builders.tsTypeAnnotation.from({
//       typeAnnotation: builders.tsStringKeyword(),
//     }),
//   }),
//   types.builders.tsMethodSignature(
//     types.builders.identifier('sayHello'),
//     [
//       types.builders.tsTypeParameter('name', builders.tsStringKeyword()),
//     ],
//     types.builders.tsTypeAnnotation(
//       types.builders.tsBooleanKeyword()
//     )
//   ),
//   builders.tsPropertySignature(
//     builders.identifier('worker'),
//     builders.tsTypeAnnotation(
//       builders.tsFunctionType.from({
//         parameters: [
//           builders.tsTypeParameter('name', builders.tsUnknownKeyword()),
//           builders.tsTypeParameter('age', builders.tsNumberKeyword()),
//         ],
//         typeAnnotation: builders.tsTypeAnnotation(builders.tsBooleanKeyword()),
//       })
//     )
//   ),
// ]);
// const result = types.builders.tsInterfaceDeclaration(id, body);
// console.log(print(result).code);
//
// const age = types.builders.tsExpressionWithTypeArguments(
//   types.builders.identifier('age'),
//   types.builders.tsTypeParameterInstantiation(
//     [types.builders.tsStringKeyword()]
//   )
// );
//
// const other = types.builders.tsIndexSignature(
//  [types.builders.identifier('other')],
//   types.builders.tsTypeAnnotation(
//     types.builders.tsStringKeyword(),
//   )
// );
// const functionType = builders.tsFunctionType.from({
//   comments: [builders.commentLine('cesh')],
//   parameters: [builders.identifier('name')],
//   typeAnnotation: builders.tsTypeAnnotation(builders.tsBooleanKeyword()),
//   typeParameters: builders.tsTypeParameterDeclaration(
//     [builders.tsTypeParameter('name', builders.tsStringKeyword())]
//   )
// });
//
// const a = builders.tsTypePredicate(
//   builders.identifier('name'),
//   builders.tsTypeAnnotation(builders.tsStringKeyword()),
// )
//
// console.log(print(age).code, print(other).code);
// console.log(print(functionType).code);
// console.log(print(a).code);
//
// const property = builders.tsPropertySignature.from({
//   key: builders.identifier('property'),
//   typeAnnotation: builders.tsTypeAnnotation.from({
//     typeAnnotation: builders.tsFunctionType.from({
//       parameters: [],
//       typeAnnotation: builders.tsTypeAnnotation(builders.tsBooleanKeyword()),
//     }),
//   }),
// });
//
// console.log(print(property).code);

const qualifiedName = builders.tsQualifiedName.from({
  left: builders.identifier('name'),
  right: builders.identifier('other'),
});
printF(qualifiedName);

const typeRefer = builders.tsTypeReference.from({
  typeName: builders.identifier('type'),
  typeParameters: builders.tsTypeParameterInstantiation.from({
    params: [builders.tsBooleanKeyword()]
  })
});
printF(typeRefer);

const tsAsExpression = builders.tsAsExpression.from({
  expression: builders.identifier('tsAsExpression'),
  typeAnnotation: builders.tsBooleanKeyword(),
});
printF(tsAsExpression);

const nonNull = builders.tsNonNullExpression.from({
  expression: builders.identifier('nonNull'),
});
printF(nonNull);

const anyKey = builders.tsAnyKeyword();
printF(anyKey);

const bigInt = builders.tsBigIntKeyword();
printF(bigInt);

const boolean = builders.tsBooleanKeyword();
printF(boolean);

const never = builders.tsNeverKeyword();
printF(never);

const Null = builders.tsNullKeyword();
printF(Null);

const number = builders.tsNumberKeyword();
printF(number);

const string = builders.tsStringKeyword();
printF(string);

const Undefined = builders.tsUndefinedKeyword();
printF(Undefined);

const unknown = builders.tsUnknownKeyword();
printF(unknown);

const obj = builders.tsObjectKeyword();
printF(obj);

const symbol = builders.tsSymbolKeyword();
printF(symbol);

const Void = builders.tsVoidKeyword();
printF(Void);

const This = builders.tsThisType();
printF(This);

const Array =  builders.tsArrayType.from({
  elementType: builders.tsStringKeyword(),
});
printF(Array);

// 字面量
const literal = builders.tsLiteralType.from({
  literal: builders.stringLiteral.from({
    value: '234fasdfadfasd'
  })
});
printF(literal);

const union = builders.tsUnionType.from({
  types: [builders.tsStringKeyword(), builders.tsBooleanKeyword(), builders.tsNumberKeyword()]
});
printF(union);

// 交集类
const interSection = builders.tsIntersectionType.from({
  types: [builders.tsStringKeyword(), builders.tsBooleanKeyword(), builders.tsNumberKeyword()]
});
printF(interSection);

// 条件表达式 三木表达式
const condition = builders.tsConditionalType.from({
  checkType: builders.tsBooleanKeyword(),
  extendsType: builders.tsBooleanKeyword(),
  falseType: builders.tsNumberKeyword(),
  trueType: builders.tsStringKeyword(),
});
printF(condition);

const infer = builders.tsInferType.from({
  typeParameter: builders.tsTypeParameter.from({
    name: 'abc',
    typeAnnotation: builders.tsTypeAnnotation.from({
      typeAnnotation: builders.tsBooleanKeyword(),
    })
  })
});
printF(infer);

const typeParams = builders.tsTypeParameter.from({
  name: 'typeParams',
  typeAnnotation: builders.tsTypeAnnotation.from({
    typeAnnotation: builders.tsStringKeyword(),
  }),
});
printF(typeParams);

//
// const codeString = "const say = (name: string) => { console.log(name); }"
//
// console.log(parse(codeString, {
//   parser: require('recast/parsers/typescript')
// }));

// fs.writeFileSync(path.resolve(__dirname, '../result/index.d.ts'), print(result).code);
