import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { UserAPI } from '@pomle/spotify-web-sdk';

import { Splash } from 'components/Splash';
import { Welcome } from 'views/Welcome';

import * as auth from './auth';

export const Authorize = withRouter(class Authorize extends Component {
  constructor(props) {
    super(props);

    this.timer = null;

    this.state = {
      busy: false,
      ready: false,
      token: null,
    };
  }

  componentDidMount() {
    this.initializeSession();

    const refreshInterval = 60 * 5 * 1000;

    const refreshPoll = () => {
      const session = this.getSession();
      if (session.refresh_token) {
        this.refreshSession(session.refresh_token);
      }
      this.timer = setInterval(refreshPoll, refreshInterval);
    };

    refreshPoll();
  }

  componenWillUnmount() {
    clearTimeout(this.timer);
  }

  initializeSession() {
    const session = this.getSessionFromEnvironment();
    if (session) {
      this.validateToken(session.access_token)
      .then(isValid => {
        if (isValid) {
          this.saveSession(session);
        } else if (session.refresh_token) {
          this.refreshSession(session.refresh_token);
        } else {
          this.purgeSession();
        }
      });
    }
  }

  refreshSession(refreshToken) {
    this.setState({busy: true});

    auth.refreshToken(refreshToken)
    .then(session => {
      this.validateToken(session.access_token);
    });
  }

  getSessionFromEnvironment() {
    let session = auth.parseQueryString(this.props.location.hash);
    if (session.access_token) {
      return session;
    }

    session = this.getSession();
    if (session) {
      return session;
    }

    return null;
  }

  validateToken(token) {
    this.setState({busy: true});

    const api = new UserAPI(token);

    return api.getMe()
    .then(data => {
      this.setState({busy: false});

      if (data.error) {
        this.setState({
          ready: false,
          token: null,
        });

        return false;
      }

      this.setState({
        ready: true,
        token,
      });

      return true;
    });
  }

  getSession() {
    return auth.getSession(this.props.storage);
  }

  purgeSession() {
    auth.purgeSession(this.props.storage);
  }

  saveSession(session) {
    auth.putSession(this.props.storage, session);
  }

  render() {
    const { busy, ready, token } = this.state;

    if (ready) {
      return this.props.render(token);
    }

    if (busy) {
      return (
        <Splash>
          <h1>Authorizing...</h1>
        </Splash>
      );
    }

    return <Welcome authURL={auth.createAuthURL()} />;
  }
});
