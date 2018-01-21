import React, { PureComponent } from 'react';
import { Image } from 'fragments/Image';
import { Artists } from 'fragments/Artists';
import './NowPlaying.css';

export class NowPlaying extends PureComponent {
  render() {
    const { track } = this.props;

    return (
      <div className="NowPlaying">
        {track ? <Image candidates={track.getIn(['album', 'images'])} /> : ''}

        <div className="trackName">{track ? track.get('name') : ''}</div>

        {track ? <Artists artists={track.get('artists')} /> : null}
      </div>
    );
  }
}
