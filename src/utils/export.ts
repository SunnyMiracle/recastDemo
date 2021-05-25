import { types } from 'recast';
import { DeclarationKind } from 'ast-types/gen/kinds';

const builders = types.builders;

export default (node: DeclarationKind) => {
  return builders.exportNamedDeclaration.from({
    declaration: node,
  });
}
