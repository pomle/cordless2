import {combineReducers} from 'redux';

import {reducer as playlist} from './playlist';

export const reducer = combineReducers({
    playlist,
});

