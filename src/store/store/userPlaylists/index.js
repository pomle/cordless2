import { createStash } from '../../reducerFactories/stash';

const {reducer, reserveItems, addItems, setTotal} = createStash('user-playlists');

export {
  reducer,
  reserveItems,
  addItems,
  setTotal,
}
