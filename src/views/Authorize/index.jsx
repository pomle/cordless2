import React, { Component } from 'react';

import {createAuthorizationURL} from 'vendor/Spotify';

export class Authorize extends Component {
  render() {
    return (
      <div className="Authorize">
        <a href={createAuthorizationURL()}>Authorize</a>
      </div>
    );
  }
}
