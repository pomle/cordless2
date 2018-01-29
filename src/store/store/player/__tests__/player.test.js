import {Map, List} from 'immutable';

import playerContextPayload from './fixtures/player-context.json';
import playerContextWithOneArtist from './fixtures/player-context-with-one-artist.json';
import playerContextWithTwoArtists from './fixtures/player-context-with-two-artists.json';
import { reducer, handleMessage } from '..';

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

      it('adds artist id to artists', () => {
        const artists = state.getIn(['context', 'track_window', 'current_track', 'artists']);
        expect(artists.size).toBe(1);
        expect(artists.getIn([0, 'id'])).toBe('4NHQUGzhtTLFvgF5SZesLK');
      });
    });

    describe('when receiving context message with two artists', () => {
      beforeEach(() => {
        state = reducer(state, handleMessage('state', playerContextWithTwoArtists));
      });

      it('adds both artists', () => {
        const artists = state.getIn(['context', 'track_window', 'current_track', 'artists']);
        expect(artists.size).toBe(2);
        expect(artists.getIn([0, 'id'])).toBe('61wk5KcJO2a9mZFzkmOe0f');
        expect(artists.getIn([1, 'id'])).toBe('0erHD7VN4kx2WwPg8w53kp');
      });

      describe('and then receives another message with one artist', () => {
        beforeEach(() => {
          state = reducer(state, handleMessage('state', playerContextWithOneArtist));
        });

        it('removes extra artist', () => {
          const artists = state.getIn(['context', 'track_window', 'current_track', 'artists']);
          expect(artists.size).toBe(1);
          expect(artists.getIn([0, 'id'])).toBe('61wk5KcJO2a9mZFzkmOe0f');
        });
      });
    });
  });
});

