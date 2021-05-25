import { types } from 'recast';

const builders = types.builders;

const string = builders.tsTypeAnnotation.from({
  typeAnnotation: builders.tsStringKeyword(),
});
const number = builders.tsTypeAnnotation.from({
  typeAnnotation: builders.tsNumberKeyword(),
});
const bool = builders.tsTypeAnnotation.from({
  typeAnnotation: builders.tsBooleanKeyword(),
});

// TODO 需要丰富

export default {
  string,
  number,
  bool,
};
