import { parse, types, print, run, visit, Options } from 'recast';

import * as fs from 'fs';
import * as path from 'path';
import getAnnotation from "./utils/typeAnnotations";

const fileContent = fs.readFileSync(path.resolve(__dirname, '../files/index.jsx')).toString();
// console.log(fileContent)

const asts = parse(fileContent, {
  parser: require('recast/parsers/flow')
}).program.body;

visit(asts, {});

const builders = types.builders;

const printF = (nodes) => {
  console.log(print(nodes).code);
}

const typeAnnoation = builders.tsTypeAnnotation.from({
  typeAnnotation: builders.tsBooleanKeyword(),
});
printF(typeAnnoation);
const typeAnnotationObject = builders.tsTypeAnnotation.from({
  typeAnnotation: builders.tsTypeLiteral.from({
    members: [
      builders.tsPropertySignature.from({
        key: builders.identifier('key'),
        typeAnnotation: builders.tsTypeAnnotation.from({
          typeAnnotation: builders.tsAnyKeyword(),
        }),
      })
    ]
  })
})
printF(typeAnnotationObject)

const typeParameter = builders.tsTypeParameterDeclaration.from({
  params: [builders.tsTypeParameter.from({
    name: 'aaa',
    typeAnnotation: typeAnnoation
  })]
});
printF(typeParameter);

const typeInstance = builders.tsTypeParameterInstantiation.from({
  params: [builders.tsStringKeyword(), builders.tsBooleanKeyword()]
});
printF(typeInstance);

const typeExpressWithType = builders.tsExpressionWithTypeArguments.from({
   expression: builders.identifier('name'),
  typeParameters: typeInstance,
});
printF(typeExpressWithType);

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
  optional: true,
  default: builders.tsBooleanKeyword(),
  typeAnnotation: typeAnnoation,
  constraint: builders.tsBooleanKeyword(),
});
printF(typeParams);

const id = builders.identifier.from({
  name: 'id',
  typeAnnotation: typeAnnoation,
});
printF(id);

const fun = builders.tsDeclareFunction.from({
  id: builders.identifier('name'),
  params: [id],
  returnType: typeAnnoation,
});

printF(fun);

const expression = builders.tsQualifiedName.from({
  left: builders.identifier('React'),
  right: builders.identifier('ReactNode'),
});

printF(expression);

const tuple = builders.tsTupleType.from({
  elementTypes: [
    builders.tsLiteralType.from({
      literal: builders.numericLiteral(1),
    })
  ]
})
printF(tuple);
const objectInfo = builders.tsInterfaceBody.from({
  body: [
    builders.tsIndexSignature.from({
      parameters: [builders.identifier.from({
        name: 'key',
        typeAnnotation: builders.tsTypeAnnotation.from({
          typeAnnotation: builders.tsStringKeyword(),
        })
      })],
      typeAnnotation: builders.tsTypeAnnotation.from({
        typeAnnotation: builders.tsBooleanKeyword(),
      })
    }),
  ]
})

printF(objectInfo);

const shapeInfo = builders.tsInterfaceBody.from({
  body: [
    builders.tsPropertySignature.from({
      key: builders.identifier('aaa'),
      typeAnnotation: builders.tsTypeAnnotation.from({
        typeAnnotation: builders.tsBooleanKeyword(),
      }),
    }),
    builders.tsIndexSignature.from({
      parameters: [builders.identifier.from({
        name: 'key',
        typeAnnotation: builders.tsTypeAnnotation.from({
          typeAnnotation: builders.tsStringKeyword(),
        })
      })],
      typeAnnotation: builders.tsTypeAnnotation.from({
        typeAnnotation: builders.tsBooleanKeyword(),
      })
    }),
  ]
});

printF(shapeInfo);


//
// const codeString = "const say = (name: string) => { console.log(name); }"
//
// console.log(parse(codeString, {
//   parser: require('recast/parsers/typescript')
// }));

// fs.writeFileSync(path.resolve(__dirname, '../result/index.d.ts'), print(result).code);
