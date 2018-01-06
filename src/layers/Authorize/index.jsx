import React, { Component } from 'react';
import { parse } from 'query-string';

import { createAuthorizationURL } from '@pomle/spotify-web-sdk';

const CLIENT_ID = 'a7cf3dcdfbd64bd5ac8d960caabbc890';
const CALLBACK_URL = 'http://localhost:3000/';

const STORAGE_KEY = 'session2';

function getSession() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const now = new Date().getTime();
    if (data.expiresAt < now) {
      return null;
    }
    return data.session;
  } catch (e) {
    console.error(e);
    return null;
  }
}

function putSession(session) {
  const now = new Date().getTime();
  const expiresInMs = parseFloat(session.expires_in) * 1000;

  const data = {
    expiresAt: now + expiresInMs,
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
      if (session.access_token) {
        putSession(session);
      }
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
          <a href={createAuthorizationURL(CLIENT_ID, CALLBACK_URL)}>Authorize</a>
        )}
      </div>
    );
  }
}
