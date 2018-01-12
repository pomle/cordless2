import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import {
  createPlayer,
  PlaybackAPI,
  PlaylistAPI,
  SearchAPI,
} from '@pomle/spotify-web-sdk';

import { createPoller } from './poller.js';
import { PlayerState } from './state.js';

import { Visuals } from 'layers/Visuals';
import { PlayerUI } from 'views/PlayerUI';

import './PlayerApplication.css';

export class PlayerApplication extends Component {
  constructor(props) {
    super(props);

    const { token } = props;

    this.apis = {
      playbackAPI: new PlaybackAPI(token),
      playlistAPI: new PlaylistAPI(token),
      searchAPI: new SearchAPI(token),
    };

    this.state = {
      player: new PlayerState(),
    };
  }

  async componentDidMount() {
    this.player = await createPlayer(this.props.token, {
      name: 'Cordless',
    });

    this.poller = createPoller(this.player, state => {
      this.update(player => player.updateState(state));
    });

    const result = await this.player.connect();

    this.update(player => player.set('connected', result));

    this.player.on('ready', message => {
      this.apis.playbackAPI.setDevice(message.device_id);
      this.update(player => player.onMessage({ type: 'ready', message }));
    });

    this.player.on('player_state_changed', message => {
      this.update(player => player.onMessage({ type: 'state', message }));
    });
  }

  update(fn) {
    this.setState(prevState =>
      Object.assign({}, prevState, {
        player: fn(prevState.player),
      })
    );
  }

  render() {
    const { player } = this.state;

    const classes = ['PlayerApplication'];
    if (player.deviceId) {
      classes.push('ready');
    } else {
      classes.push('pending');
    }

    return (
      <Route
        path="*"
        render={({ match }) => {
          return (
            <div className={classes.join(' ')}>
              <PlayerUI
                applicationState={Object.assign({}, this.apis, this.state)}
              />
              <Visuals
                promote={match.url === '/now-playing'}
                context={player.context}
                track={player.context.toJS().track_window.current_track}
              />
            </div>
          );
        }}
      />
    );
  }
}
