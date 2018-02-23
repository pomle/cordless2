import { Record, Map } from 'immutable';

const State = Record({
  analysis: new Map(),
  feature: new Map(),
});

const SET_ANALYSIS = 'r/track/set-analysis';
const SET_FEATURE = 'r/track/set-feature';

export function setAnalysis(trackId, data) {
  return {
    type: SET_ANALYSIS,
    trackId,
    data,
  };
}

export function setFeature(trackId, data) {
  return {
    type: SET_FEATURE,
    trackId,
    data,
  };
}

export function reducer(state = new State(), action = {}) {
  switch(action.type) {
    case SET_ANALYSIS:
      return state.setIn(['analysis', action.trackId], action.data);
    case SET_FEATURE:
      return state.setIn(['feature', action.trackId], action.data);
    default:
      return state;
  }
}
