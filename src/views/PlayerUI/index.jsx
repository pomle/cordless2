import React, { Component } from 'react';

import {Navigation} from './Navigation';
import {Playback} from './Playback';

import './PlayerUI.css';

export class PlayerUI extends Component {
  render() {
    const { applicationState } = this.props;

    return (
      <div className="PlayerUI">
        <div className="viewport">
          <Navigation applicationState={applicationState}/>
        </div>
        <Playback player={applicationState.player} playbackAPI={applicationState.playbackAPI}/>
      </div>
    );
  }
}
