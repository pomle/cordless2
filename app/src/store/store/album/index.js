import { createIndex, createFetcher } from '../../object-index';

const { reducer, mergeEntry } = createIndex('album');

export function fetchAlbum(albumId) {
  return (dispatch, getState) => {
    const api = getState().session.albumAPI;

    api.getAlbum(albumId)
    .then(album => dispatch(mergeEntry(albumId, album)));
  };
}

export const fetchAlbumTracks = createFetcher(albumId => {
  return {
    request: state => {
      const api = state.session.albumAPI;
      return api.consumer(api.getTracks(albumId));
    },

    onFlush: results => {
      return results.map(result => addAlbumTracks(albumId, result));
    },
  };
});

export function addAlbumTracks(albumId, payload) {
  return mergeEntry(albumId, {tracks: payload});
}

export { reducer };
