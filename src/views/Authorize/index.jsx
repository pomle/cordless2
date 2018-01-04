import React, { Component } from 'react';
import {parse} from 'query-string';

import {createAuthorizationURL} from 'vendor/Spotify';

export class Authorize extends Component {
  constructor(props) {
    super(props);

    const params = parse(props.route.location.hash);

    this.state = {
      token: params.access_token
    };
  }

  render() {
    const {player} = this.props;
    const {token} = this.state;

    return (
      <div className="Authorize">
        { token
            ? React.createElement(player, {token})
            : <a href={createAuthorizationURL()}>Authorize</a>
        }
      </div>
    );
  }
}
