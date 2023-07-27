import 'whatwg-fetch';
import { HYDRATE } from 'next-redux-wrapper';
import rootReducer from './rootReducer';

describe('rootReducer', () => {
  it('returns the reducer', () => {
    expect(rootReducer({}, { type: null })).toBeDefined();
  });

  it('hydrates correctly', () => {
    expect(
      rootReducer({}, { type: HYDRATE, payload: { hydrated: true } })
    ).toMatchObject({ hydrated: true });
  });
});
