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
  track_window: null,
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
        return this.set('context', this.context.merge(message));
      default:
        return this;
    }
  }
}
