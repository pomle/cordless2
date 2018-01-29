import { combineReducers } from 'redux';

import { reducer as track, searchTracks } from './track.js';

export function search(query) {
  return [
    searchTracks(query),
  ];
}

export const reducer = combineReducers({
  track,
});
