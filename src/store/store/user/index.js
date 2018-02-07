import { createIndex } from '../../object-index';

const { reducer, mergeEntry } = createIndex('user');

export function fetchUser(userId) {
  return (dispatch, getState) => {
    const api = getState().session.userAPI;

    api.getUser(userId)
    .then(user => dispatch(mergeEntry(userId, user)));
  };
}

export { reducer };
