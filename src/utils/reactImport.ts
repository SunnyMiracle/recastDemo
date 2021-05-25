import { types } from 'recast';

const builders = types.builders;

export default builders.importDeclaration.from({
  source: builders.stringLiteral('react'),
  importKind: 'value',
  specifiers: [
    builders.importNamespaceSpecifier.from({
      id: builders.identifier('React'),
    }),
  ]
});
