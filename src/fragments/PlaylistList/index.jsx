import React, { Component } from 'react';

import { PlayableList } from 'components/PlayableList';
import { Playlist } from 'fragments/Playlist';
import ViewportDetector from 'components/ViewportDetector';

import './PlaylistList.css';

export class PlaylistList extends Component {
  render() {
    const { playlists, playbackAPI, onViewportChange } = this.props;
    const items = playlists.items;

    return (
      <div className="PlaylistList">
        <PlayableList>
          <ViewportDetector count={playlists.total} onDraw={index => {
            if (!items.has(index)) {
              return null;
            }

            const playlist = items.get(index);
            return <div key={playlist.get('id') + '-' + index} className="item">
                <Playlist playlist={playlist} playbackAPI={playbackAPI} />
            </div>
          }}/>
        </PlayableList>
      </div>
    );
  }
}
