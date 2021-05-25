import { types, print } from 'recast';

export default (nodes: types.ASTNode) => {
  console.log(print(nodes).code);
};
