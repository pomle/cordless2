import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { PlayButton } from 'components/PlayButton';
import { Image } from 'fragments/Image';

import { playAlbum } from '@pomle/spotify-redux';

import './Album.css';

export const Album = connect(null, {playAlbum})(class Album extends Component {
  play = () => {
    const { album, playAlbum } = this.props;
    playAlbum(album.get('id'));
  };

  render() {
    const { album } = this.props;

    return (
      <div className="Album">
        <div className="image">
          <Image candidates={album.get('images')} />
        </div>

        <div className="name">
          <Link to={`/album/${album.get('id')}`}>{album.get('name')}</Link>
        </div>

        <div className="playback">
          <PlayButton onClick={this.play} />
        </div>
      </div>
    );
  }
});
