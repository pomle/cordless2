import React, { Component } from 'react';

import {Artists} from 'fragments/Artists';

import './NowPlaying.css';

export class NowPlaying extends Component {
  render() {
    const {track} = this.props;

    if (!track) {
      return null;
    }

    return (
      <div className="NowPlaying">
        <div className="trackName">
          {track.name}
        </div>
        <Artists artists={track.artists}/>
      </div>
    );
  }
}
