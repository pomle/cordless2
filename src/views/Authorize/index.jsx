import React, { Component } from 'react';
import { parse } from 'query-string';

import { createAuthorizationURL } from 'vendor/Spotify';

const STORAGE_KEY = 'session';

function getSession() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const now = new Date().getTime();
    if (data.expiresAt > now) {
      return null;
    }
    return data.session;
  } catch (e) {
    console.error(e);
    return null;
  }
}

function putSession(session) {
  const data = {
    expiresAt: new Date().getTime() + parseFloat(session.expires_in),
    session,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export class Authorize extends Component {
  constructor(props) {
    super(props);

    let session = getSession();
    if (!session) {
      session = parse(props.route.location.hash);
      putSession(session);
    }

    this.state = {
      token: session.access_token,
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
