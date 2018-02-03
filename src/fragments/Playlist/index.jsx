import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { PlayButton } from 'components/PlayButton';
import { Image } from 'fragments/Image';

import { playContext } from 'store';

import './Playlist.css';

export const Playlist = connect(null, {playContext})(class Playlist extends PureComponent {
  play = () => {
    const { playlist, playContext } = this.props;
    playContext(playlist.get('uri'));
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
          <Link to={`/user/${owner.get('id')}/playlist/${playlist.get('id')}`}>
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
});
