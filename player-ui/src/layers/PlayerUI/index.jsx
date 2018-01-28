import React, { Component } from 'react';

import { Navigation } from './Navigation';
import Playback from 'views/Playback';

import './Animation.css';
import './PlayerUI.css';

export class PlayerUI extends Component {
  render() {
    return (
      <div className="PlayerUI">
        <div className="viewport">
          <Navigation />
        </div>

        <div className="playback">
          <Playback />
        </div>
      </div>
    );
  }
}
