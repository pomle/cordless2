import { OrderedSet } from 'immutable';
import { createIndex, createFetcher } from 'library/store/object-index';

const { reducer, updateResult, mergeEntry, mergeEntries, setResult, setEntries } = createIndex('playlist');

export function fetchPlaylist(userId, playlistId) {
  return async (dispatch, getState) => {
    const api = getState().session.playlistAPI;
    const playlist = await api.getPlaylist(userId, playlistId);
    dispatch(mergeEntry(playlist.id, playlist));
  };
}

export const fetchUserPlaylists = createFetcher(userId => {
  let list = new OrderedSet();

  return {
    request: state => {
      const api = state.session.playlistAPI;
      return api.consumer(api.getPlaylists(userId));
    },

    onFlush: results => {
      const ids = [...results.map(result => result.items.map(p => p.id))];
      list = list.concat(...ids);
      return results.map(addPlaylists).push(updateResult(userId, list));
    },

    onFinish: () => setResult(userId, list)
  };
}, {
  refresh: 10000,
});


export const fetchPlaylistTracks = createFetcher((userId, playlistId) => {
  return {
    request: state => {
      const api = state.session.playlistAPI;
      return api.consumer(api.getPlaylistTracks(userId, playlistId));
    },

    onFlush: results => {
      return results.map(result => addPlaylistTracks(playlistId, result));
    },

    onFinish: () => {
      return setEntries([]);
      //console.log('Finish');
    }
  };
}, {
  refresh: 10000,
});

export function addPlaylist(payload) {
  return mergeEntry(payload.id, payload);
}

export function addPlaylists(payload) {
  const entries = {};
  for (const playlist of payload.items) {
      entries[playlist.id] = playlist;
  }
  return mergeEntries(entries);
}

export function addPlaylistTracks(playlistId, payload) {
  const items = [];
  for (const [index, entry] of payload.items.entries()) {
    items[index + payload.offset] = entry;
  }
  return mergeEntry(playlistId, {tracks: {items}});
}

export { reducer };
