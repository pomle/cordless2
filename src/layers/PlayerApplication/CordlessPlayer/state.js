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
        return this.updateContext(message);
      default:
        return this;
    }
  }

  updateContext(state) {
    return this.set(
      'context',
      this.context.withMutations(context => {
        Object.keys(state).forEach(key => {
          context.set(key, state[key]);
        });
        return context;
      })
    );
  }
}
