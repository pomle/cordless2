import React, { Component } from 'react';

import { PlayableList } from 'components/PlayableList';
import { Playlist } from 'fragments/Playlist';

import './PlaylistList.css';

export class PlaylistList extends Component {
  render() {
    const { playlists, playbackAPI } = this.props;

    return (
      <div className="PlaylistList">
        <PlayableList>
          {playlists.map(playlist => {
            return (
              <div key={playlist.get('id')} className="item">
                <Playlist playlist={playlist} playbackAPI={playbackAPI} />
              </div>
            );
          })}
        </PlayableList>
      </div>
    );
  }
}
