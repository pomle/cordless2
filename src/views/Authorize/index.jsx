import React, { Component } from 'react';
import { parse } from 'query-string';

import { createAuthorizationURL } from 'vendor/Spotify';

export class Authorize extends Component {
  constructor(props) {
    super(props);

    let token = localStorage.getItem('access_token');
    if (token.length < 30) {
      const params = parse(props.route.location.hash);
      token = params.access_token || '';
      localStorage.setItem('access_token', token);
    }

    this.state = {
      token,
    };
  }

  render() {
    const { token } = this.state;

    return (
      <div className="Authorize">
        {token ? (
          this.props.render(token)
        ) : (
          <a href={createAuthorizationURL()}>Authorize</a>
        )}
      </div>
    );
  }
}
