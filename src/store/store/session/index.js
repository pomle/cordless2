import { Session } from './state';

const SET_TOKEN = 'r/session/set-token';

export function setToken(token) {
  return {
    type: SET_TOKEN,
    token,
  };
}

export function reducer(state = new Session(), action = {}) {
  switch (action.type) {
    case SET_TOKEN:
      return state.set('token', action.token);
    default:
      return state;
  }
}
