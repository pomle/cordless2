import sinon from 'sinon';

import { createStore } from '../';
import { fetchPlaylistTracks } from '../playlist-entry.js';
import playlistData from './fixtures/playlist.json';

function fakeResponse(data, done) {
    function json() {
        return Promise.resolve(data);
    }

    const headers = {
        get() {
            return 'application/json';
        }
    }

    return Promise.resolve({
        headers,
        json,
    });
}

describe('Store', () => {
  let store;

  beforeEach(() => {
    global.fetch = sinon.stub();
    jest.useFakeTimers();
    store = createStore();
  });

  it('initially has no token', () => {
    const state = store.getState();
    expect(state.session.token).toBe(null);
  });

  describe('#fetchPlaylistTracks', () => {
    beforeEach(() => {
      fetch.returns(fakeResponse(playlistData));
      store.dispatch(fetchPlaylistTracks('pomle', 'a9ga90gaj'));
      jest.runAllTimers();
    });

    it('inserts tracks as entries and track objects', () => {
      const state = store.getState();
      expect(state.playlistEntry.results.get('a9ga90gaj').size).toBe(65);
      expect(state.playlistEntry.entries.get('a9ga90gaj-0').track)
        .toEqual({"id": "06pO3MN977OqQeX4EYfds8"});
      expect(state.track.entries.size).toBe(65);
      expect(state.track.entries.get('0zeqKbySjKbfW5jyl3PMsW').uri)
        .toEqual("spotify:track:0zeqKbySjKbfW5jyl3PMsW");
    });
  });
});
