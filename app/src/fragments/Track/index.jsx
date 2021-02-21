import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import { PlayButton } from 'components/PlayButton';
import { Artists } from 'fragments/Artists';

export class Track extends PureComponent {
  play = () => {
    this.props.play(this.props.track);
  };

  render() {
    const { track } = this.props;
    const isLocal = track.get('uri').startsWith('spotify:local:');

    return (
      <div className="Track">
        <div className="playback">
          {!isLocal ? (
            <PlayButton onClick={this.play} />
          ) : (
            <button>Local</button>
          )}
        </div>
        <div className="name">{track.get('name')}</div>
        <div className="artists">
          <Artists artists={track.get('artists')} />
        </div>
        {track.has('album') ? (
          <div className="album">
            <Link to={`/album/${track.getIn(['album','id'])}`}>{track.getIn(['album','name'])}</Link>
          </div>
        ) : null}
      </div>
    );
  }
}
