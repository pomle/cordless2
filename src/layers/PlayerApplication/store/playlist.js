import { List } from 'immutable';
import { createIndex } from 'library/store/object-index';

const { reducer, setResult, setEntry, setEntries } = createIndex('playlist');

export function fetchUserPlaylists(userId) {
  return async (dispatch, getState) => {
    const api = getState().session.playlistAPI;

    let results = new List();

    api.consume(api.getPlaylists(), items => {
      dispatch(
        setEntries(
          items.map(item => ({
            id: item.id,
            object: item,
          }))
        )
      );

      results = results.push(...items.map(item => item.id));

      dispatch(setResult(userId, results));
    });
  };
}

export function fetchPlaylist(userId, playlistId) {
  return async (dispatch, getState) => {
    const api = getState().session.playlistAPI;
    const playlist = await api.getPlaylist(userId, playlistId);
    dispatch(setEntry(playlist.id, playlist));
  };
}

export { reducer };
