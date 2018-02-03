import { createStash } from '../../reducerFactories/stash';

const {reducer, reserveItems, addItems, setTotal} = createStash('user-playlists');

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

export {
  reducer,
}
