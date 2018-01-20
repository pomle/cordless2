import { createIndex, createFetcher } from 'library/store/object-index';

const { reducer, mergeEntry } = createIndex('artist');

export function fetchArtist(artistId) {
  return async (dispatch, getState) => {
    const api = getState().session.artistAPI;

    api.getArtist(artistId)
    .then(artist => dispatch(mergeEntry(artistId, artist)));

    dispatch(fetchArtistAlbums(artistId));
  };
}

export const fetchArtistAlbums = createFetcher(artistId => {
  return {
    request: state => {
      const api = state.session.artistAPI;
      return api.consumer(api.getAlbums(artistId));
    },

    onFlush: results => {
      return results.map(result => addArtistAlbums(artistId, result));
    },
  };
});

export function addArtistAlbums(artistId, payload) {
  return mergeEntry(artistId, {albums: payload});
}

export { reducer };
