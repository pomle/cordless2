import { List } from 'immutable';
import { createIndex } from 'library/store/object-index';
import { setEntries as setTracks } from './track.js';

const { reducer, setResult, setEntries } = createIndex('playlist-entry');

export function fetchPlaylistTracks(userId, playlistId) {
  return async (dispatch, getState) => {
    const api = getState().session.playlistAPI;

    let results = new List();

    api.consume(
      api.getPlaylistTracks(userId, playlistId), items => {
        const filtered = items.filter(entry => !entry.is_local);

        const playlistEntries = filtered.map((entry, index) => {
          const id = `${playlistId}-${index}`;

          results = results.push(id);

          return {
            id,
            object: Object.assign({}, entry, {
              track: {id: entry.track.id},
            })
          };
        });

        const trackEntries = filtered.map(entry => ({
          id: entry.track.id,
          object: entry.track,
        }));

        dispatch(setEntries(playlistEntries));

        dispatch(setTracks(trackEntries));

        dispatch(setResult(playlistId, results));
    });
  };
}

export { reducer };
