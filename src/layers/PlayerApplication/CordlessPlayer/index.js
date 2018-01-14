import { createPlayer } from '@pomle/spotify-web-sdk';
import { createPoller } from './poller.js';
import { PlayerState } from './state.js';

export class CordlessPlayer {
  constructor(token) {
    this.token = token;
    this.state = new PlayerState();
  }

  getState() {
    return this.state;
  }

  initialize() {
    createPlayer(this.token, {
      name: 'Cordless',
    })
    .then(player => {
      this.player = player;

      this.player.on('ready', message => {
        this.update(state => state.onMessage({ type: 'ready', message }));
      });

      this.player.on('player_state_changed', message => {
        this.update(state => state.onMessage({ type: 'state', message }));
      });

      this.poller = createPoller(this.player, context => {
        this.update(state => state.updateContext(context));
      });

      return this.player.connect();
    })
    .then(result => {
      this.update(state => state.set('connected', result));
    });
  }

  destroy() {
    this.poller.destroy();
    this.player.disconnect();
  }

  update(fn) {
    this.state = fn(this.state);

    if (this.onUpdate) {
      this.onUpdate(this.state);
    }
  }
}
