import { combineReducers } from 'redux';

import { reducer as playlist } from './playlist';
import { reducer as search } from './search';
import { reducer as session } from './session';

export const reducer = combineReducers({
  playlist,
  search,
  session,
});
