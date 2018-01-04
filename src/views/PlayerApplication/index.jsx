import React, { Component } from 'react';

import { createPlayer } from 'vendor/Spotify';
import { PlaybackAPI, PlaylistAPI } from 'vendor/Spotify/API';

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
    };
  }

  async componentDidMount() {
    this.player = await createPlayer(this.props.token);

    const result = await this.player.connect();

    this.update(player => player.set('connected', result));

    this.player.on('ready', message => {
      this.update(player => player.onMessage({ type: 'ready', message }));
    });
  }

  update(fn) {
    this.setState({
      player: fn(this.state.player),
    });
  }

  render() {
    const { player, playlistAPI, playbackAPI } = this.state;

    return (
      <PlayerUI
        player={player}
        playlistAPI={playlistAPI}
        playbackAPI={playbackAPI}
      />
    );
  }
}
