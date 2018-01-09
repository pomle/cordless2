import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {PlayButton} from 'components/PlayButton';
import {Artists} from 'fragments/Artists';

export class Track extends Component {
  play = () => {
    this.props.play(this.props.track);
  };

  render() {
    const { track } = this.props;
    const isLocal = track.uri.startsWith('spotify:local:');

    return (
      <div className="Track">
        <div className="playback">
          { !isLocal
            ? <PlayButton onClick={this.play}/>
            : <button>Local</button>
          }
        </div>
        <div className="name">
          {track.name}
        </div>
        <div className="artists">
          <Artists artists={track.artists}/>
        </div>
        { track.album
          ? <div className="album">
            <Link to={`/album/${track.album.id}`}>{track.album.name}</Link>
          </div>
          : null
        }
      </div>
    );
  }
}
