import React, { Component } from 'react';

import { Navigation } from './Navigation';
import { Playback } from 'views/Playback';

import './Animation.css';
import './PlayerUI.css';

export class PlayerUI extends Component {
  render() {
    const { player } = this.props;

    return (
      <div className="PlayerUI">
        <div className="viewport">
          <Navigation />
        </div>

        <Playback player={player} />
      </div>
    );
  }
}
