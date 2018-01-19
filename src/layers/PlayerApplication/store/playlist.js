import { List } from 'immutable';
import { createIndex } from 'library/store/object-index';

const { reducer, setResult, setEntries } = createIndex('playlist');

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

export { reducer };
