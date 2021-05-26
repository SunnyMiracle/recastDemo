import { types } from 'recast';

const builders = types.builders;

const any = builders.tsTypeAnnotation.from({
  typeAnnotation: builders.tsAnyKeyword(),
});
const array = builders.tsTypeAnnotation.from({
  typeAnnotation: builders.tsArrayType.from({
    elementType: builders.tsUnknownKeyword(),
  }),
});
const bool = builders.tsTypeAnnotation.from({
  typeAnnotation: builders.tsBooleanKeyword(),
});
const func = builders.tsTypeAnnotation.from({
  typeAnnotation: builders.tsFunctionType.from({
    parameters: [],
    typeAnnotation: builders.tsTypeAnnotation.from({
      typeAnnotation: builders.tsUnknownKeyword(),
    }),
  }),
});
const number = builders.tsTypeAnnotation.from({
  typeAnnotation: builders.tsNumberKeyword(),
});
const object = builders.tsTypeAnnotation.from({
  typeAnnotation: builders.tsObjectKeyword(),
});
const string = builders.tsTypeAnnotation.from({
  typeAnnotation: builders.tsStringKeyword(),
});
const node = builders.tsTypeAnnotation.from({
  typeAnnotation: builders.tsExpressionWithTypeArguments.from({
    expression: builders.tsQualifiedName.from({
      left: builders.identifier('React'),
      right: builders.identifier('ReactNode'),
    }),
  }),
});
const element = builders.tsTypeAnnotation.from({
  typeAnnotation: builders.tsExpressionWithTypeArguments.from({
    expression: builders.tsQualifiedName.from({
      left: builders.identifier('React'),
      right: builders.identifier('ReactElement'),
    }),
  }),
});
const symbol = builders.tsTypeAnnotation.from({
  typeAnnotation: builders.tsSymbolKeyword(),
});
const elementType = builders.tsTypeAnnotation.from({
  typeAnnotation: builders.tsExpressionWithTypeArguments.from({
    expression: builders.tsQualifiedName.from({
      left: builders.identifier('React'),
      right: builders.identifier('ElementType'),
    }),
  }),
})

// any
// array
// bool
// func
// number
// object
// string
// node
// element
// symbol
// elementType


// TODO  下边这些方法展示不支持。
// instanceOf
// oneOf
// oneOfType
// arrayOf
// objectOf
// shape
// exact
export default {
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
  elementType,
};
