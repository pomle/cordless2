import { createPlayer } from '@pomle/spotify-web-sdk';
import { createPoller } from './poller.js';
import { PlayerState } from './state.js';

export class CordlessPlayer {
  constructor(token) {
    this.token = token;
    this.state = new PlayerState();
    this.destroyed = false;
  }

  getState() {
    return this.state;
  }

  initialize() {
    createPlayer(this.token, {
      name: 'Cordless',
    })
      .then(player => {
        if (this.destroyed) {
          return;
        }

        this.player = player;

        this.player.on('ready', message => {
          this.update(state => state.onMessage({ type: 'ready', message }));
        });

        this.player.on('player_state_changed', message => {
          if (!message) {
            console.warn('player_state_changed message was empty', message);
            return;
          }

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
    if (this.poller) {
      this.poller.destroy();
    }
    if (this.player) {
      this.player.disconnect();
    }
    this.destroyed = true;
  }

  update(fn) {
    this.state = fn(this.state);

    if (this.onUpdate) {
      this.onUpdate(this.state);
    }
  }
}
