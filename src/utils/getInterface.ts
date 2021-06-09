import { types } from 'recast';
import getAnnotation from './typeAnnotations';
import {IProps} from "./getKeyInfo";

const builders = types.builders;

export interface IProperty {
  [key: string]: IProps
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
          typeAnnotation: getAnnotation(properties[key]),
        })
      )),
    }),
  });
}
