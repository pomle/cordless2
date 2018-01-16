import {Record, List, Map} from 'immutable';

const State = Record({
    index: new Map(),
});

export function reducer(state = new State(), action = {}) {
    return state;
}

