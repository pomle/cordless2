import { Record } from 'immutable';

import { PlaylistAPI } from '@pomle/spotify-web-sdk';

const State = Record({
  token: null,
});

class Session extends State {
  get playlistAPI() {
    return new PlaylistAPI(this.token);
  }
}

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
