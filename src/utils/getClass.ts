import { types } from 'recast';

const builders = types.builders;

// TODO 目前先支持 类的静态方法生成吧，静态属性先不考虑。
export default (className: string, propsName: string, stateName: string) => {
  return builders.classDeclaration.from({
    id: builders.identifier(className),
    superClass: builders.memberExpression.from({
      object: builders.identifier('React'),
      property: builders.identifier('Component'),
    }),
    superTypeParameters: builders.tsTypeParameterInstantiation.from({
      params: [
        ...(propsName ? [builders.tsExpressionWithTypeArguments.from({
          expression: builders.identifier(propsName),
        })] : []),
        ...(stateName ? [builders.tsExpressionWithTypeArguments.from({
          expression: builders.identifier(stateName),
        })] : []),
      ]
    }),
    body: builders.classBody.from({
      body: []
    }),
  });
};
