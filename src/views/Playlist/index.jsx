import React, { Component } from 'react';

import {PlaylistIndex} from './Index';

export class Playlist extends Component {
  render() {
    const {playlistAPI, playbackAPI, player} = this.props;

    return playlistAPI
      ? <PlaylistIndex playlistAPI={playlistAPI} playbackAPI={playbackAPI} player={player} />
      : <div>Please wait</div>;
  }
}
