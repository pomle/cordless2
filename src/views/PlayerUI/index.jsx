import React, { Component } from 'react';

import { PlaybackAPI, PlaylistAPI } from 'vendor/Spotify/API';

import { Playlist } from 'views/Playlist';
import { Player } from 'views/Player';

export class PlayerUI extends Component {
  constructor(props) {
    super(props);

    const { token } = props;

    this.state = {
      playbackAPI: new PlaybackAPI(token),
      playlistAPI: new PlaylistAPI(token),
    };
  }

  render() {
    const { token } = this.props;
    const { playlistAPI, playbackAPI } = this.state;

    return (
      <div className="PlayerUI">
        <Player
          token={token}
          render={player => {
            return (
              <Playlist
                player={player}
                playlistAPI={playlistAPI}
                playbackAPI={playbackAPI}
              />
            );
          }}
        />
      </div>
    );
  }
}
