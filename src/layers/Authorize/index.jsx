import React, { Component } from 'react';
import { parse } from 'query-string';

import { UserAPI, createAuthorizationURL } from '@pomle/spotify-web-sdk';

import { Splash } from 'components/Splash';
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

function purgeSession(storage) {
  storage.removeItem(STORAGE_KEY);
}

export class Authorize extends Component {
  constructor(props) {
    super(props);

    const { storage } = props;

    let session = getSession(storage);
    if (!session) {
      session = parse(props.route.location.hash);
      if (session.access_token) {
        putSession(storage, session);
      }
    }

    this.state = {
      ready: false,
      token: session.access_token,
    };
  }

  async componentDidMount() {
    console.log('mount');

    const api = new UserAPI(this.state.token);
    const data = await api.getMe();
    if (data.error) {
      this.setState({
        ready: false,
        token: null,
      });

      purgeSession(this.props.storage);
    } else {
      this.setState({
        ready: true,
      });
    }
  }

  render() {
    const { ready, token } = this.state;

    if (ready) {
      return this.props.render(token);
    }

    if (token) {
      return <Splash>
        <h1>Authorizing...</h1>
      </Splash>;
    }

    return <Welcome authURL={createAuthorizationURL(CLIENT_ID, CALLBACK_URL)} />;
  }
}
