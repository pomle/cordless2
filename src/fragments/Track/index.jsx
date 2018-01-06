import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
            ? <button onClick={this.play}>Play</button>
            : <button>Local</button>
          }
        </div>
        <div className="name">
          {track.name}
        </div>
        <div className="artists">
          <Artists artists={track.artists}/>
        </div>
        <div className="album">
          <Link to={`/album/${track.album.id}`}>{track.album.name}</Link>
        </div>
      </div>
    );
  }
}
