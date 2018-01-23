import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Interface } from './Interface';
import { NowPlaying } from './NowPlaying';
import { Scrubber } from './Scrubber';
import { Time } from 'components/Time';

import { pause, resume, seek, next, prev } from '@pomle/spotify-redux';

import './Playback.css';

export class Playback extends Component {
  static propTypes = {
    pause: PropTypes.func.isRequired,
    resume: PropTypes.func.isRequired,
    seek: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
    prev: PropTypes.func.isRequired,
  };

  toggle = () => {
    const { resume, pause, player: {context} } = this.props;
    if (context.paused) {
      resume();
    } else {
      pause();
    }
  };

  render() {
    const { prev, next, seek, player, analysis } = this.props;

    return (
      <div className="Playback">
        <NowPlaying track={player.currentTrack} />
        <Scrubber
          context={player.context}
          seek={seek}
          analysis={analysis}
        />
        <Interface prev={prev} next={next} toggle={this.toggle} />
        <div className="vis">
          <Link to="/now-playing">Now Playing</Link>
          <div className="time">
            <Time seconds={player.context.position / 1000} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => {
  const track = state.player.currentTrack;
  const trackId = track && track.get('id');
  return {
    analysis: state.track.analysis.get(trackId),
    player: state.player,
  };
}, {
  pause, resume, seek, next, prev
})(Playback);
