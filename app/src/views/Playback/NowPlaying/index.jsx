import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'fragments/Image';
import { Artists } from 'fragments/Artists';
import './NowPlaying.css';

function CoverArt({track}) {
  if (!track) {
    return null;
  }

  return <Link to="/now-playing">
    <Image candidates={track.getIn(['album', 'images'])} />
  </Link>;
}

export class NowPlaying extends PureComponent {
  render() {
    const { track } = this.props;

    return (
      <div className="NowPlaying">
        <CoverArt track={track}/>

        <div className="trackName">{track ? track.get('name') : ''}</div>

        {track ? <Artists artists={track.get('artists')} /> : null}
      </div>
    );
  }
}
