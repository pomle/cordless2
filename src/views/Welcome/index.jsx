import React, { Component } from 'react';

import SpotifyLogo from './spotify.svg';

import './Welcome.css';

export class Welcome extends Component {
  render() {
    const { authURL } = this.props;

    return (
      <div className="Welcome">
        <h1>Cordless2</h1>

        <h2>Open Source&ensp;<a href="https://www.spotify.com"><img alt="Spotify" style={{height: '2em'}} src={SpotifyLogo}/></a>&ensp;Player</h2>

        <a href={authURL}><button>Authorize</button></a>
      </div>
    );
  }
}
