import React, { Component } from 'react';

import { createPlayer, PlaybackAPI, PlaylistAPI, SearchAPI } from '@pomle/spotify-web-sdk';

import { PlayerState } from './state.js';

import { PlayerUI } from 'views/PlayerUI';

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
    this.player = await createPlayer(this.props.token);

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
    this.setState({
      player: fn(this.state.player),
    });
  }

  render() {
    return (
      <PlayerUI applicationState={this.state}/>
    );
  }
}
