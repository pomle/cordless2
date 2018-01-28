import React, { Component } from 'react';

import { PlayableList } from 'components/PlayableList';
import { Album } from 'fragments/Album';

import './AlbumList.css';

export class AlbumList extends Component {
  render() {
    const { albums } = this.props;

    return (
      <div className="AlbumList">
        <PlayableList>
          {albums.map(album => {
            return (
              <div key={album.get('id')} className="item">
                <Album album={album} />
              </div>
            );
          })}
        </PlayableList>
      </div>
    );
  }
}
