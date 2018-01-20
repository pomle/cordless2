import { combineReducers } from 'redux';

import { reducer as playlist } from './playlist';
import { reducer as session } from './session';
import { reducer as track } from './track';

export const reducer = combineReducers({
  playlist,
  session,
  track,
});
