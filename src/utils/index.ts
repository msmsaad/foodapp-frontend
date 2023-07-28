import _ from 'lodash';

export const getInitials = (name: string): string => {
  return _(name)
    .words()
    .map((word: string) => _.head(word)?.toUpperCase() || '')
    .join('');
};
