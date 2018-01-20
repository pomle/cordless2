import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { PlayButton } from 'components/PlayButton';
import { Image } from 'fragments/Image';

import './Playlist.css';

export class Playlist extends Component {
  static contextTypes = {
    api: PropTypes.object,
  };

  play = () => {
    const { playlist } = this.props;
    this.context.api.playbackAPI.playContext(playlist.get('uri'));
  };

  render() {
    const { playlist } = this.props;
    const owner = playlist.get('owner');

    return (
      <div className="Playlist">
        <div className="image">
          <Image candidates={playlist.get('images')} />
        </div>

        <div className="name">
          <Link
            to={`/user/${owner.get('id')}/playlist/${playlist.get('id')}`}
            className="name"
          >
            {playlist.get('name')}
          </Link>
        </div>

        <div className="trackCount">{playlist.get('tracks').get('total')}</div>

        <div className="owner">
          <Link to={`/user/${owner.get('id')}`}>{owner.get('display_name')}</Link>
        </div>

        <div className="playback">
          <PlayButton onClick={this.play} />
        </div>
      </div>
    );
  }
}
