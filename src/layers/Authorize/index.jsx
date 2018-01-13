import React, { Component } from 'react';
import { parse } from 'query-string';

import { createAuthorizationURL } from '@pomle/spotify-web-sdk';

import { Welcome } from 'views/Welcome';

const CLIENT_ID = 'a7cf3dcdfbd64bd5ac8d960caabbc890';
const CALLBACK_URL = process.env.REACT_APP_SITE_URL || 'http://localhost:3000/';

const STORAGE_KEY = 'session2';

function getSession(storage) {
  try {
    const data = JSON.parse(storage.getItem(STORAGE_KEY));
    const now = new Date().getTime();
    if (data.expiresAt < now) {
      return null;
    }
    return data.session;
  } catch (e) {
    // console.error(e);
    return null;
  }
}

function putSession(storage, session) {
  const now = new Date().getTime();
  const expiresInMs = parseFloat(session.expires_in) * 1000;

  const data = {
    expiresAt: now + expiresInMs,
    session,
  };

  storage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export class Authorize extends Component {
  constructor(props) {
    super(props);

    const {storage} = props;

    let session = getSession(storage);
    if (!session) {
      session = parse(props.route.location.hash);
      if (session.access_token) {
        putSession(storage, session);
      }
    }

    this.state = {
      token: session.access_token,
    };
  }

  render() {
    const { token } = this.state;

    return token ? (
      this.props.render(token)
    ) : (
      <Welcome authURL={createAuthorizationURL(CLIENT_ID, CALLBACK_URL)} />
    );
  }
}
