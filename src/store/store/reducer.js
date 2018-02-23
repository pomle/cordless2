import { combineReducers } from 'redux';

import { reducer as album } from './album';
import { reducer as artist } from './artist';
import { reducer as color } from './color';
import { reducer as player } from './player';
import { reducer as playlist } from './playlist';
import { reducer as search } from './search';
import { reducer as session } from './session';
import { reducer as track } from './track';
import { reducer as user } from './user';

export const reducer = combineReducers({
  album,
  artist,
  color,
  player,
  playlist,
  search,
  session,
  track,
  user,
});
