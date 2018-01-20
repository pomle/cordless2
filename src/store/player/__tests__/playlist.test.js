import {Map, List} from 'immutable';

import playlistFixture from './fixtures/playlist.json';
import playlistsFixture from './fixtures/playlists.json';
import playlistTracksFixture from './fixtures/playlist-tracks.json';
import morePlaylistTracksFixture from './fixtures/more-playlist-tracks.json';
import { reducer, addPlaylist, addPlaylists, addPlaylistTracks } from '../playlist.js';

describe('Playlist', () => {

  describe('reducer', () => {
    let state;

    beforeEach(() => {
      state = reducer();
    });

    it('produces an initial state', () => {
      expect(state).toBeTruthy();
    });

    describe('#addPlaylist', () => {
      beforeEach(() => {
        state = reducer(state, addPlaylist(playlistFixture));
      });

      it('adds playlist to index', () => {
        const playlist = state.entries.get('37i9dQZEVXcPjvMvCQvf93');
        expect(playlist).toBeInstanceOf(Map);
        expect(playlist.get('name')).toBe('Discover Weekly');
        expect(playlist.get('tracks').get('items').get(0).get('added_at')).toBe('2018-01-14T22:00:00Z');
        expect(playlist.get('tracks').get('items').get(5).get('track').get('name')).toBe('Fem steg framför');
      });

      describe('#addPlaylistTracks', () => {
        beforeEach(() => {
          state = reducer(state, addPlaylistTracks('37i9dQZEVXcPjvMvCQvf93', playlistTracksFixture));
        });

        it('adds track to playlist entry', () => {
          expect(state.entries.size).toBe(1);
          const playlist = state.entries.get('37i9dQZEVXcPjvMvCQvf93');
          expect(playlist.get('tracks').get('items').size).toBe(30);
          expect(playlist.get('tracks').get('items').get(2).get('track').get('name')).toBe('1minutecanbepowerful');
        });
      });
    });

    describe('#addPlaylists', () => {
      beforeEach(() => {
        state = reducer(state, addPlaylists(playlistsFixture));
      });

      it('adds all to index', () => {
        expect(state.entries.size).toBe(20);
        expect(state.entries.get('37i9dQZEVXcPjvMvCQvf93')).toBeInstanceOf(Map);
      });
    });

    describe('#addPlaylistTracks', () => {
      beforeEach(() => {
        state = reducer(state, addPlaylistTracks('37i9dQZEVXcPjvMvCQvf93', playlistTracksFixture));
      });

      it('adds track to playlist entry', () => {
        expect(state.entries.size).toBe(1);
        const playlist = state.entries.get('37i9dQZEVXcPjvMvCQvf93');
        expect(playlist.get('tracks').get('items').size).toBe(30);
        expect(playlist.get('tracks').get('items').get(2).get('track').get('name')).toBe('1minutecanbepowerful');
      });

      describe('when #addPlaylistTracks run again', () => {
        beforeEach(() => {
          state = reducer(state, addPlaylistTracks('37i9dQZEVXcPjvMvCQvf93', morePlaylistTracksFixture));
        });

        it('maintains previous tracks', () => {
          expect(state.entries.size).toBe(1);
          const playlist = state.entries.get('37i9dQZEVXcPjvMvCQvf93');
          expect(playlist.get('tracks').get('items').size).toBe(130);
          expect(playlist.get('tracks').get('items').get(2).get('track').get('name')).toBe('1minutecanbepowerful');
          expect(playlist.get('tracks').get('items').get(129).get('track').get('name')).toBe('Midnight City');
        });
      });

      describe('#addPlaylists', () => {
        beforeEach(() => {
          state = reducer(state, addPlaylists(playlistsFixture));
        });

        it('does not remove any tracks of entries', () => {
          expect(state.entries.size).toBe(20);
          const playlist = state.entries.get('37i9dQZEVXcPjvMvCQvf93');
          expect(playlist.get('tracks').get('items').size).toBe(30);
          expect(playlist.get('tracks').get('items').get(2).get('track').get('name')).toBe('1minutecanbepowerful');
        });
      });
    });
  });
});

