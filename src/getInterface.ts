import { types, print } from 'recast';

const builders = types.builders;

const out = (nodes: types.ASTNode) => {
  console.log(print(nodes).code);
}

const className = 'Loading';

const exp = builders.importDeclaration.from({
  source: builders.stringLiteral('react'),
  importKind: 'value',
  specifiers: [
    builders.importNamespaceSpecifier.from({
      id: builders.identifier('React'),
    }),
  ]
});

out(exp);

const interfaceE = builders.tsInterfaceDeclaration.from({
  id: builders.identifier('IProps'),
  body: builders.tsInterfaceBody.from({
    body: [
      builders.tsPropertySignature.from({
        key: builders.identifier('name'),
        optional: true,
        typeAnnotation: builders.tsTypeAnnotation.from({
          typeAnnotation: builders.tsStringKeyword(),
        }),
      }),
    ]
  }),
});

out(interfaceE);

const exportInterface = builders.exportNamedDeclaration.from({
  declaration: interfaceE,
});

out(exportInterface);


const interfaceType = builders.interfaceTypeAnnotation.from({
  body: builders.objectTypeAnnotation.from({
    properties: []
  })
})

out(interfaceType);

const classA = builders.classDeclaration.from({
  id: builders.identifier(className),
  superClass: builders.memberExpression.from({
    object: builders.identifier('React'),
    property: builders.identifier('Component'),
  }),
  superTypeParameters: builders.tsTypeParameterInstantiation.from({
    params: [
      builders.tsExpressionWithTypeArguments.from({
        expression: builders.identifier('IProps'),
      }),
      builders.tsExpressionWithTypeArguments.from({
        expression: builders.identifier('IState'),
      }),
    ]
  }),
  body: builders.classBody.from({
    body: [
      builders.tsMethodSignature.from({
        key: builders.identifier('name'),
        parameters: [builders.identifier('info')],
        typeAnnotation: builders.tsTypeAnnotation.from({
          typeAnnotation: builders.tsBooleanKeyword(),
        })
      }),
      builders.methodDefinition.from({
        key: builders.identifier('abc'),
        static: true,
        kind: 'method',
        value: builders.functionDeclaration.from({
          id: builders.identifier('id'),
          body: builders.blockStatement.from({
            body: [],
          }),
          params: [],
          typeParameters: builders.tsTypeParameterDeclaration.from({
            params: [],
          }),
        }),
      }),
      builders.methodDefinition.from({
        key: builders.identifier('config'),
        static: true,
        kind: 'method',
        value: builders.arrowFunctionExpression.from({
          returnType: builders.tsTypeAnnotation.from({
            typeAnnotation: builders.tsBooleanKeyword(),
          }),
          body: builders.blockStatement.from({
            body: []
          }),
          params: [],
        })
      }),
    ]
  }),
});

const exportEx = builders.exportDefaultDeclaration.from({
  declaration: classA,
})

out(classA);
out(exportEx);

