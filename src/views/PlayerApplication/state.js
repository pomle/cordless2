import { Record, List } from 'immutable';

const TrackWindow = Record({
  current_track: null,
  next_tracks: new List(),
  previous_tracks: new List(),
});

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
  track_window: new TrackWindow(),
});

const State = Record({
  connected: false,
  ready: false,
  deviceId: null,
  context: new Context(),
});

export class PlayerState extends State {
  onMessage({ type, message }) {
    switch (type) {
      case 'ready':
        return this.set('ready', true).set('deviceId', message.device_id);
      case 'state':
        return this.updateState(message);
      default:
        return this;
    }
  }

  updateState(state) {
    return this.set('context', this.context.merge(state));
  }
}
