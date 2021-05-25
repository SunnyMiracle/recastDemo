import { types, print } from 'recast';

const builders = types.builders;

const out = (nodes: types.ASTNode) => {
  console.log('declare', print(nodes).code);
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

const exportDefafult = builders.exportDefaultDeclaration.from({
  declaration: builders.identifier('a')
});
out(exportDefafult);


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
      builders.classMethod.from({
        key: builders.identifier('classMethod'),
        body: builders.blockStatement.from({
          body: [],
        }),
        params: [],
        static: true,
      }),
      builders.classPropertyDefinition.from({
        definition: builders.classProperty.from({
          access: 'public',
          value: builders.identifier('abc'),
          key: builders.identifier('classPropertyDefinition'),
        })
      }),
      builders.classProperty.from({
        key: builders.identifier('classProperty'),
        static: true,
        value: builders.identifier('value'),
      }),
      builders.classPrivateProperty.from({
        key: builders.privateName(builders.identifier('classPrivateProperty')),
        value: builders.identifier('value'),
      }),
      builders.tsDeclareMethod.from({
        key: builders.identifier('tsDeclareMethod'),
        params: [],
        static: true,
        returnType: builders.tsTypeAnnotation.from({
          typeAnnotation: builders.tsBooleanKeyword(),
        }),
      }),
      builders.tsCallSignatureDeclaration.from({
        parameters: []
      }),
      builders.tsConstructSignatureDeclaration.from({
        parameters: []
      }),
      builders.tsIndexSignature.from({
        parameters: []
      }),
      builders.tsMethodSignature.from({
        key: builders.identifier('tsMethodSignature'),
        parameters: [builders.identifier('info')],
        typeAnnotation: builders.tsTypeAnnotation.from({
          typeAnnotation: builders.tsBooleanKeyword(),
        })
      }),
      builders.tsPropertySignature.from({
        key: builders.identifier('tsPropertySignature'),
        typeAnnotation: builders.tsTypeAnnotation.from({
          typeAnnotation: builders.tsFunctionType.from({
            parameters: [],
            typeAnnotation: builders.tsTypeAnnotation.from({
              typeAnnotation: builders.tsBooleanKeyword(),
            })
          })
        })
      }),
    ]
  }),
});

const classImplementsEx = builders.classImplements.from({
  id: builders.identifier('LoadingClassImplement'),
  superClass: builders.identifier('React.Component'),
  typeParameters: builders.typeParameterInstantiation.from({
    params: []
  })
});

const classBDeclare = builders.declareClass.from({
  id: builders.identifier('Loading'),
  body: builders.objectTypeAnnotation.from({
    properties: [
      builders.objectTypeProperty.from({
        key: builders.identifier('name'),
        value: builders.numberTypeAnnotation(),
        optional: true,
      })
    ]
  }),
  typeParameters: builders.typeParameterDeclaration.from({
    params: []
  }),
  extends: [
    builders.interfaceExtends.from({
      id: builders.identifier.from({
        name: 'React',
        typeAnnotation:  builders.tsTypeAnnotation.from({
          typeAnnotation: builders.tsBooleanKeyword(),
        })
      })
    }),
  ]
});

out(classImplementsEx);

const exportEx = builders.exportDefaultDeclaration.from({
  declaration: classA,
})

out(classA);
// out(classBDeclare);
// out(exportEx);

