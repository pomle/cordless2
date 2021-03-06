import React, { Component } from 'react';

import CordlessLogo from 'assets/cordless-logo.png';
import SpotifyLogo from './spotify.svg';

import './Welcome.css';

export class Welcome extends Component {
  render() {
    const { authURL } = this.props;

    return (
      <div className="Welcome">
        <h1>
          <img alt="Cordless Logo" src={CordlessLogo} />
        </h1>

        <h2>
          Open Source&ensp;<a href="https://www.spotify.com">
            <img alt="Spotify" style={{ height: '2em' }} src={SpotifyLogo} />
          </a>&ensp;Player
        </h2>

        <div className="authorize">
          <a href={authURL}>
            <button>Authorize</button>
          </a>
        </div>

        <div className="join">
          Join development
          <div>
            <a href="https://github.com/pomle/cordless2">GitHub</a>
            &emsp;
            <a href="https://discord.gg/kc9RRcC">Discord</a>
          </div>
        </div>
      </div>
    );
  }
}
