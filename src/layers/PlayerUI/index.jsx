import React, { Component } from 'react';

import { Navigation } from './Navigation';
import { Playback } from 'views/Playback';

import './PlayerUI.css';

export class PlayerUI extends Component {
  onScroll = event => {
    console.log(event);
  };

  /*componentDidMount() {
    this.viewport.addEventListener('scroll', this.onScroll);
    this.viewport.addEventListener('mousewheel', this.onScroll);
  }*/

  render() {
    const { applicationState } = this.props;

    return (
      <div className="PlayerUI">
        <div className="viewport" ref={node => (this.viewport = node)}>
          <Navigation applicationState={applicationState} />
        </div>
        <Playback
          player={applicationState.player}
          playbackAPI={applicationState.playbackAPI}
        />
      </div>
    );
  }
}
