import React, { Component } from 'react';

import {Image} from 'fragments/Image';
import {Artists} from 'fragments/Artists';

import './NowPlaying.css';

export class NowPlaying extends Component {
  render() {
    const {track} = this.props;

    return (
      <div className="NowPlaying">
        { track
          ? <Image candidates={track.album.images}/>
          : ''
        }

        <div className="trackName">
          {track ? track.name : ''}
        </div>

        { track
          ? <Artists artists={track.artists}/>
          : null
        }
      </div>
    );
  }
}
