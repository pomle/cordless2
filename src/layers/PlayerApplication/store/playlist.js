import { List } from 'immutable';
import { createIndex, createFetcher } from 'library/store/object-index';

const { reducer, updateResult, setResult, setEntry, setEntries } = createIndex('playlist');

export const fetchUserPlaylists = createFetcher(userId => {
  return {
    request: state => {
      const api = state.session.playlistAPI;
      return api.consumer(api.getPlaylists());
    },
    onEntries: entries => setEntries(entries),
    onResult: result => updateResult(userId, result),
    onFinish: finalResult => setResult(userId, finalResult),
  };
}, {
  refresh: 10000,
});

export function fetchPlaylist(userId, playlistId) {
  return async (dispatch, getState) => {
    const api = getState().session.playlistAPI;
    const playlist = await api.getPlaylist(userId, playlistId);
    dispatch(setEntry(playlist.id, playlist));
  };
}

export { reducer };
