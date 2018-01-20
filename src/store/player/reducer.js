import { combineReducers } from 'redux';

import { reducer as album } from './album';
import { reducer as artist } from './artist';
import { reducer as player } from './player';
import { reducer as playlist } from './playlist';
import { reducer as search } from './search';
import { reducer as session } from './session';

export const reducer = combineReducers({
  album,
  artist,
  player,
  playlist,
  search,
  session,
});
