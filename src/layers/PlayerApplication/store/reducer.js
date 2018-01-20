import { combineReducers } from 'redux';

import { reducer as playlist } from './playlist';
import { reducer as playlistEntry } from './playlist-entry';
import { reducer as session } from './session';
import { reducer as track } from './track';

export const reducer = combineReducers({
  playlist,
  playlistEntry,
  session,
  track,
});
