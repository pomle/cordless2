import { OrderedSet } from 'immutable';
import { createIndex, createFetcher } from '../../object-index';
import { reserveItems, addItems, setTotal } from '../stash';

const { reducer, updateResult, mergeEntry, mergeEntries, setResult } = createIndex('playlist');

export function fetchPlaylist(userId, playlistId) {
  return (dispatch, getState) => {
    const api = getState().session.playlistAPI;

    api.getPlaylist(userId, playlistId)
    .then(playlist => {
      const entries = getState().playlist.entries;
      const snapshotId = entries.getIn([playlistId, 'snapshot_id']);
      const snapshotsMatch = snapshotId === playlist.snapshot_id;
      if (!snapshotsMatch) {
        console.log('Updated snapshot', snapshotId);
        dispatch(mergeEntry(playlistId, playlist));
      }

      const tracks = entries.getIn([playlistId, 'tracks', 'items']);
      const trackCountMatch = tracks && tracks.size === playlist.tracks.total;
      if (!trackCountMatch || !snapshotsMatch) {
        dispatch(fetchPlaylistTracks(userId, playlistId));
      }
    });
  };
}

export function fetchUserPlaylists(userId, offset, limit) {
  return (dispatch, getState) => {

    const {session, stash} = getState();
    if (stash.get(userId).items.get(offset)) {
      return;
    }

    dispatch(reserveItems(userId, offset, limit));

    session.playlistAPI.getPlaylists(userId, {offset, limit})
    .then(response => {
      dispatch(setTotal(userId, response.total));
      dispatch(addItems(userId, offset, response.items));
    });
  }
}

export const fetchUserPlaylists_ = createFetcher(userId => {
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
      return mergeEntry(playlistId);
    }
  };
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
