import React, { Component } from 'react';

import {Navigation} from './Navigation';
import {Playback} from './Playback';

import './PlayerUI.css';

export class PlayerUI extends Component {
  render() {
    const { player, playlistAPI, playbackAPI } = this.props;

    return (
      <div className="PlayerUI">
        <div className="viewport">
          <Navigation player={player} playlistAPI={playlistAPI} playbackAPI={playbackAPI}/>
        </div>
        <Playback player={player} playbackAPI={playbackAPI}/>
      </div>
    );
  }
}
