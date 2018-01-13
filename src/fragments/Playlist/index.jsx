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
    this.context.api.playbackAPI.playContext(playlist.uri);
  };

  render() {
    const { playlist } = this.props;
    const { owner } = playlist;

    return (
      <div className="Playlist">
        <div className="image">
          <Image candidates={playlist.images} />
        </div>

        <div className="name">
          <Link
            to={`/user/${playlist.owner.id}/playlist/${playlist.id}`}
            className="name"
          >
            {playlist.name}
          </Link>
        </div>

        <div className="trackCount">{playlist.tracks.total}</div>

        <div className="owner">
          <Link to={`/user/${owner.id}`}>{owner.display_name}</Link>
        </div>

        <div className="playback">
          <PlayButton onClick={this.play} />
        </div>
      </div>
    );
  }
}
