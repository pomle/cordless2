import React, { Component } from 'react';
//import { Route } from 'react-router-dom';

import { Playlist } from 'views/Playlist';

export class PlayerUI extends Component {
  render() {
    const { player, playlistAPI, playbackAPI } = this.props;

    return (
      <div className="PlayerUI">
        <Playlist
          player={player}
          playlistAPI={playlistAPI}
          playbackAPI={playbackAPI}
        />
      </div>
    );
  }
}
