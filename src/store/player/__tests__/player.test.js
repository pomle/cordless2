import {Map, List} from 'immutable';

import playerContextPayload from './fixtures/player-context.json';
import { reducer, handleMessage } from '../player.js';

describe('Player', () => {

  describe('reducer', () => {
    let state;

    beforeEach(() => {
      state = reducer();
    });

    it('produces an initial state', () => {
      expect(state.ready).toBe(false);
      expect(state.context.bitrate).toBe(null);
    });

    describe('when receiving ready message', () => {
      beforeEach(() => {
        state = reducer(state, handleMessage('ready', {device_id: '9182nu1928nvu124n12'}));
      });

      it('updates player state', () => {
        expect(state.ready).toBe(true);
        expect(state.deviceId).toBe('9182nu1928nvu124n12');
      });
    });

    describe('when receiving context message', () => {
      beforeEach(() => {
        state = reducer(state, handleMessage('state', playerContextPayload));
      });

      it('updates player state', () => {
        expect(state.context.bitrate).toBe(256000);
        expect(state.context.track_window.get('current_track')).toBeInstanceOf(Map);
      });
    });
  });
});

