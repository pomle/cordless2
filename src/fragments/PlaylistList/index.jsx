import React, { Component } from 'react';

import { Playlist } from 'fragments/Playlist';
import './PlaylistList.css';

export class PlaylistList extends Component {
  render() {
    const {playlists, player, playbackAPI} = this.props;

    return (
      <div className="PlaylistList">
        {playlists.map(playlist => {
          return (
            <div key={playlist.id} className="item">
              <Playlist
                playlist={playlist}
                player={player}
                playbackAPI={playbackAPI}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
