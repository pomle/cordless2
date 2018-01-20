import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { PlayButton } from 'components/PlayButton';
import { Image } from 'fragments/Image';

import './Album.css';

export class Album extends Component {
  static contextTypes = {
    api: PropTypes.object,
  };

  play = () => {
    const { album } = this.props;
    this.context.api.playbackAPI.playAlbum(album.get('id'));
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
}
