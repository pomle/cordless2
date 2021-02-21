import {Map, List} from 'immutable';

import { reducer, setToken } from '..';

describe('Session state', () => {

  describe('reducer', () => {
    let session;

    beforeEach(() => {
      session = reducer();
    });

    it('produces an initial state', () => {
      expect(session.deviceId).toBe(null);
      expect(session.token).toBe(null);
    });

    describe('when token set', () => {
      const FAKE_TOKEN = '98m12vmu54u10v9824jum19284j';

      beforeEach(() => {
        session = reducer(session, setToken(FAKE_TOKEN));
      });

      it('stores token in state', () => {
        expect(session.token).toBe(FAKE_TOKEN);
      });

      [
        'albumAPI',
        'artistAPI',
        'playbackAPI',
        'playlistAPI',
        'searchAPI',
        'trackAPI',
      ].forEach(name => {
        it(`applies token to ${name}`, () => {
          const api = session[name];
          expect(api.token).toBe(FAKE_TOKEN);
        });
      });
    })
  });
});

