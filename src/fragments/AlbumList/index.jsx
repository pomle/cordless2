import React, { Component } from 'react';

import { PlayableList } from 'components/PlayableList';
import { Album } from 'fragments/Album';

import './AlbumList.css';

export class AlbumList extends Component {
  render() {
    const { albums } = this.props;

    return (
      <PlayableList>
        <div className="AlbumList">
          {albums.map(album => {
            return (
              <div key={album.id} className="item">
                <Album album={album} />
              </div>
            );
          })}
        </div>
      </PlayableList>
    );
  }
}
