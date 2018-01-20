import { Record } from 'immutable';

const Context = Record({
  bitrate: null,
  context: null,
  disallows: null,
  duration: null,
  paused: null,
  position: null,
  repeat_mode: null,
  restrictions: null,
  shuffle: null,
  timestamp: null,
  track_window: {
    current_track: null,
  },
});

const PlayerState = Record({
  connected: false,
  ready: false,
  deviceId: null,
  context: new Context(),
});

const MESSAGE = 'r/player/message';

export function handleMessage(name, message) {
  return {
    type: MESSAGE,
    name,
    message,
  };
}

function onMessage(state, name, message) {
  switch (name) {
    case 'ready':
      return state.set('ready', true).set('deviceId', message.device_id);
    case 'state':
      return state.mergeDeepIn(['context'], message);
    default:
      return state;
  }
}

export function reducer(state = new PlayerState(), action = {}) {
  switch(action.type) {
    case MESSAGE:
      return onMessage(state, action.name, action.message);
    default:
      return state;
  }
}
