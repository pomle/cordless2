import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {PlayButton} from 'components/PlayButton';
import {Image} from 'fragments/Image';

import './Playlist.css';

export class Playlist extends Component {
  play = () => {
    const { playbackAPI, playlist } = this.props;
    playbackAPI.playContext(playlist.uri);
  };

  render() {
    const { playlist } = this.props;
    const { owner } = playlist;

    return (
      <div className="Playlist">
        <div className="image">
          <Image candidates={playlist.images}/>
        </div>

        <div className="name">
          <Link
            to={`/playlist/${playlist.id}/user/${playlist.owner.id}`}
            className="name"
          >
            {playlist.name}
          </Link>
        </div>

        <div className="trackCount">
          {playlist.tracks.total}
        </div>

        <div className="owner">
          <Link to={`/user/${owner.id}`}>
            {owner.display_name}
          </Link>
        </div>

        <div className="playback">
          <PlayButton onClick={this.play}/>
        </div>
      </div>
    );
  }
}
