import React, { Component } from 'react';

import { createPlayer, PlaybackAPI, PlaylistAPI, SearchAPI } from '@pomle/spotify-web-sdk';

import {createPoller} from './poller.js';
import { PlayerState } from './state.js';

import { Visuals } from 'layers/Visuals';
import { PlayerUI } from 'views/PlayerUI';

import './PlayerApplication.css';

export class PlayerApplication extends Component {
  constructor(props) {
    super(props);

    const { token } = props;

    this.state = {
      player: new PlayerState(),
      playbackAPI: new PlaybackAPI(token),
      playlistAPI: new PlaylistAPI(token),
      searchAPI: new SearchAPI(token),
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
      this.update(player => player.onMessage({ type: 'ready', message }));
    });

    this.player.on('player_state_changed', message => {
      this.update(player => player.onMessage({ type: 'state', message }));
    });
  }

  update(fn) {
    this.setState(prevState => Object.assign({}, prevState, {
      player: fn(prevState.player),
    }));
  }

  render() {
    const {player: {context}} = this.state;

    return (
      <div className="PlayerApplication">
        <PlayerUI applicationState={this.state}/>
        <Visuals track={context.toJS().track_window.current_track}/>
      </div>
    );
  }
}
