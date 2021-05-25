import { types } from 'recast';
import { DeclarationKind, ExpressionKind } from 'ast-types/gen/kinds';

const builders = types.builders;

export default (node: DeclarationKind | ExpressionKind) => {
  return builders.exportDefaultDeclaration.from({
    declaration: node,
  });
}
