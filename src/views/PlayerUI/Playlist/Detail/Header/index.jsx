import React, { Component } from 'react';

import {Image} from 'fragments/Image';

import './Header.css';

export class PlaylistDetailHeader extends Component {
  render() {
    const { playlist } = this.props;

    return (
      <header className="PlaylistDetailHeader">
        <div className="image">
          <Image candidates={playlist.images}/>
        </div>

        <h2>{playlist.name}</h2>
      </header>
    );
  }
}
