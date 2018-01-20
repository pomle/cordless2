import { List } from 'immutable';
import { createIndex } from 'library/store/object-index';

const { reducer, setResult, setEntries } = createIndex('track');

export function fetchPlaylistTracks(userId, playlistId) {
  return async (dispatch, getState) => {
    const api = getState().session.playlistAPI;

    let results = new List();

    api.consume(
      api.getPlaylistTracks(userId, playlistId), items => {
        const filtered = items.filter(entry =>
          entry.track.uri.startsWith('spotify:track:')
        );

        dispatch(
          setEntries(
            filtered.map(entry => ({
              id: entry.track.id,
              object: entry.track,
            }))
          )
        );

        results = results.push(...filtered.map(entry => entry.track.id));

        dispatch(setResult(playlistId, results));
    });
  };
}

export { reducer, setEntries };
