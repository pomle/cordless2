import { Record } from "immutable";

const Context = Record({
  bitrate: null,
  context: null,
  disallows: null,
  duration: null,
  loading: null,
  paused: null,
  playback_quality: null,
  playback_features: null,
  playback_speed: null,
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

class Player extends PlayerState {
  get currentTrack() {
    return this.getIn(["context", "track_window", "current_track"]);
  }
}

const MESSAGE = "r/player/message";

function withAPI(fn) {
  return (dispatch, getState) => {
    const { session, player } = getState();
    const api = session.playbackAPI;
    api.setDevice(player.deviceId);
    fn(api, player);
  };
}

function wrapAPI(fnName) {
  return (...args) => withAPI((api) => api[fnName](...args));
}

export const playAlbum = wrapAPI("playAlbum");
export const playContext = wrapAPI("playContext");
export const playPlaylist = wrapAPI("playPlaylist");
export const playTracks = wrapAPI("playTracks");

export const seek = wrapAPI("seek");
export const pause = wrapAPI("pause");
export const resume = wrapAPI("resume");
export const next = wrapAPI("next");
export const prev = wrapAPI("prev");
export const repeat = wrapAPI("repeat");
export const shuffle = wrapAPI("shuffle");
export const volume = wrapAPI("volume");

const REPEAT_CYCLE = ["off", "context", "track"];

export function cycleRepeat() {
  return withAPI((api, { context }) => {
    const next = (context.repeat_mode + 1) % REPEAT_CYCLE.length;
    api.repeat(REPEAT_CYCLE[next]);
  });
}

export function cycleShuffle() {
  return withAPI((api, { context }) => {
    api.shuffle(!context.shuffle);
  });
}

export function cyclePlayback() {
  return withAPI((api, { context }) => {
    if (context.paused) {
      api.resume();
    } else {
      api.pause();
    }
  });
}

export function handleMessage(name, message) {
  return {
    type: MESSAGE,
    name,
    message,
  };
}

function toId(uri) {
  return uri.split(":")[2];
}

function mergeContext(state, context) {
  for (const artist of context.track_window.current_track.artists) {
    artist.id = toId(artist.uri);
  }
  return state.mergeIn(["context"], context);
}

function onMessage(state, name, message) {
  switch (name) {
    case "ready":
      return state.set("ready", true).set("deviceId", message.device_id);
    case "state":
      return mergeContext(state, message);
    default:
      return state;
  }
}

export function reducer(state = new Player(), action = {}) {
  switch (action.type) {
    case MESSAGE:
      return onMessage(state, action.name, action.message);
    default:
      return state;
  }
}
