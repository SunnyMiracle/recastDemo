import { types } from 'recast';
import * as Kinds from 'ast-types/gen/kinds';
import {IProps, oneOfArgType, oneOfTypeArgType, shapeArgType} from "../getKeyInfo";

const builders = types.builders;

const anyType = builders.tsAnyKeyword();
const arrayType = builders.tsArrayType.from({
  elementType: builders.tsUnknownKeyword(),
});
const boolType = builders.tsBooleanKeyword();
const funcType = builders.tsFunctionType.from({
  parameters: [],
  typeAnnotation: builders.tsTypeAnnotation.from({
    typeAnnotation: builders.tsUnknownKeyword(),
  }),
});
const numberType = builders.tsNumberKeyword();
const objectType =  builders.tsObjectKeyword()
const stringType = builders.tsStringKeyword();
const nodeType = builders.tsExpressionWithTypeArguments.from({
  expression: builders.tsQualifiedName.from({
    left: builders.identifier('React'),
    right: builders.identifier('ReactNode'),
  }),
});
const elementType = builders.tsExpressionWithTypeArguments.from({
  expression: builders.tsQualifiedName.from({
    left: builders.identifier('React'),
    right: builders.identifier('ReactElement'),
  }),
});
const symbolType = builders.tsSymbolKeyword();
const any = builders.tsTypeAnnotation.from({
  typeAnnotation: anyType,
});
const array = builders.tsTypeAnnotation.from({
  typeAnnotation: arrayType,
});
const bool = builders.tsTypeAnnotation.from({
  typeAnnotation: boolType,
});
const func = builders.tsTypeAnnotation.from({
  typeAnnotation: funcType,
});
const number = builders.tsTypeAnnotation.from({
  typeAnnotation: numberType,
});
const object = builders.tsTypeAnnotation.from({
  typeAnnotation: objectType,
});
const string = builders.tsTypeAnnotation.from({
  typeAnnotation: stringType,
});
const node = builders.tsTypeAnnotation.from({
  typeAnnotation: nodeType,
});
const element = builders.tsTypeAnnotation.from({
  typeAnnotation: elementType,
});
const symbol = builders.tsTypeAnnotation.from({
  typeAnnotation: symbolType,
});
// 联合类型，用于oneOf oneOfType
const unionType = (info: IProps) => {
  if (info.type === 'oneOf' || info.type === 'oneOfType') {
    const argus = [];
    const args = info.args[0] as oneOfTypeArgType | oneOfArgType;
    args.forEach(item => {
      if (typeof item === 'object') {
        argus.push(getType(item as IProps));
      } else {
        if (typeof item === 'number') {
          argus.push(builders.tsLiteralType.from({
            literal: builders.numericLiteral(item),
          }));
        } else if (typeof item === 'string') {
          argus.push(builders.tsLiteralType.from({
            literal: builders.stringLiteral(item),
          }));
        } else if (typeof item === 'boolean') {
          argus.push(builders.tsLiteralType.from({
            literal: builders.booleanLiteral(item),
          }));
        } else {
          argus.push(builders.tsAnyKeyword());
        }
      }
    });
    return builders.tsUnionType.from({
      types: argus
    });
  }
  return any;
}
const arrayOfType = (info: IProps) => {
  return builders.tsArrayType.from({
    elementType: getType(info.args[0] as IProps),
  });
}
const objectOfType = (info: IProps) => {
  return builders.tsTypeLiteral.from({
    members: [
      builders.tsIndexSignature.from({
        parameters: [builders.identifier.from({
          name: 'key',
          typeAnnotation: builders.tsTypeAnnotation.from({
            typeAnnotation: builders.tsStringKeyword(),
          })
        })],
        typeAnnotation: getAnnotation(info.args[0] as IProps),
      }),
    ]
  })
}
const shapeType = (info: IProps) => {
  const args = info.args[0] as shapeArgType;
  const properties: (Kinds.TSPropertySignatureKind | Kinds.TSIndexSignatureKind)[] = Object.keys(args).map((key) => {
    return builders.tsPropertySignature.from({
      key: builders.identifier(key),
      typeAnnotation: getAnnotation(args[key]),
    });
  });
  if (info.type === 'shape') {
    properties.push(
      builders.tsIndexSignature.from({
        parameters: [builders.identifier.from({
          name: 'key',
          typeAnnotation: builders.tsTypeAnnotation.from({
            typeAnnotation: builders.tsStringKeyword(),
          })
        })],
        typeAnnotation: any,
      })
    )
  }
  return builders.tsTypeLiteral.from({
    members: properties,
  });
}
export type TPropTypes =
'any' | 'array' | 'bool' | 'func' | 'number' | 'object' | 'string' | 'node'
|'element' | 'symbol' | 'elementType'
| 'instanceOf'| 'oneOf'| 'oneOfType'| 'arrayOf'| 'objectOf'| 'shape'| 'exact' | string;

const typeMaps = {
  anyType,
  arrayType,
  boolType,
  funcType,
  numberType,
  objectType,
  stringType,
  nodeType,
  elementType,
  symbolType,
};
const maps = {
  any,
  array,
  bool,
  func,
  number,
  object,
  string,
  node,
  element,
  symbol,
};

const getType = (propsInfo: IProps) => {
  if (propsInfo.args) {
    // instanceOf不支持，忽略掉吧。
    if (propsInfo.type === 'instanceOf') {
      return anyType;
    }
    if (propsInfo.type === 'oneOfType' || propsInfo.type === 'oneOf') {
      return unionType(propsInfo);
    }
    if (propsInfo.type === 'objectOf') {
      return objectOfType(propsInfo);
    }
    if (propsInfo.type === 'arrayOf') {
      return arrayOfType(propsInfo);
    }
    if (propsInfo.type === 'shape' || propsInfo.type === 'exact') {
      return shapeType(propsInfo);
    }
  } else if (propsInfo.type === 'elementType') {
    return stringType;
  }
  return typeMaps[`${propsInfo.type}Type`];
}
const getAnnotation = (propInfo: IProps) => {
  if (propInfo.args) {
    return builders.tsTypeAnnotation.from({
      typeAnnotation: getType(propInfo),
    });
  } else if (propInfo.type === 'elementType') {
    // 对于PropTypes.elementType 类型的直接返回字符串类型即可。
    return string;
  } else  {
    return maps[propInfo.type];
  }
}

export default getAnnotation;
