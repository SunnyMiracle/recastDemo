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
        typeAnnotation: builders.tsTypeAnnotation.from({
          typeAnnotation: builders.tsStringKeyword(),
        }),
      }),
    ]
  }),
});

out(interfaceE);

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
    params: []
  }),
  body: builders.classBody.from({
    body: []
  }),
});

const exportEx = builders.exportDefaultDeclaration.from({
  declaration: classA,
})

out(classA);
out(exportEx);

