import {Record} from 'immutable';

const State = Record({
  connected: false,
  ready: false,
  deviceId: null,
});

export class PlayerState extends State {
  onMessage({type, message}) {
    switch (type) {
      case 'ready':
        return this.set('ready', true).set('deviceId', message.device_id);
      default:
        return this;
    }
  }
}
