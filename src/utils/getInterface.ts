import { types } from 'recast';
import TA from './typeAnnotations/index';

const builders = types.builders;

export interface IProperty {
  [key: string]: {
    isRequired?: boolean;
    type: 'string' | 'number' | 'bool' | 'func' | string;
  }
}

export default (properties: IProperty, name: string) => {
  const keys = Object.keys(properties);
  return builders.tsInterfaceDeclaration.from({
    id: builders.identifier(name),
    body: builders.tsInterfaceBody.from({
      body: keys.map(key => (
        builders.tsPropertySignature.from({
          key: builders.identifier(key),
          optional: !properties[key].isRequired,
          typeAnnotation: TA[properties[key].type],
        })
      )),
    }),
  });
}
