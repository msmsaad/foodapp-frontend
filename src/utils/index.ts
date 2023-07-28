import _ from 'lodash';

export const getInitials = (name: string): string => {
  return _(name)
    .words()
    .map((word: string) => _.head(word)?.toUpperCase() || '')
    .join('');
};

export const prepareHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {};
  const token = localStorage.getItem('access-token');
  const client = localStorage.getItem('client');
  const uid = localStorage.getItem('uid');

  if (token && client && uid) {
    headers['access-token'] = token;
    headers['client'] = client;
    headers['uid'] = uid;
  }

  return headers;
};
