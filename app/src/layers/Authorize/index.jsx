import React, { Component } from "react";
import { withRouter } from "react-router";

import { UserAPI } from "@pomle/spotify-web-sdk";

import { Splash } from "components/Splash";
import { Welcome } from "views/Welcome";

import * as auth from "./auth";

export const Authorize = withRouter(
  class Authorize extends Component {
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
    }

    componenWillUnmount() {
      clearTimeout(this.timer);
    }

    componentDidUpdate() {
      if (this.props.location.pathname === "/logout") {
        this.purgeSession();
        props.history.replace("/");
      }
    }

    queueRefresh(refreshToken, waitSeconds = 600) {
      clearTimeout(this.timer);

      const refreshInMs = waitSeconds * 1000;

      this.timer = setTimeout(() => {
        this.refreshSession(refreshToken);
      }, refreshInMs);
    }

    initializeSession() {
      const session = this.getSessionFromEnvironment();
      if (session) {
        this.validateSession(session);
      }
    }

    refreshSession(refreshToken) {
      this.setState({ busy: true });

      auth.refreshToken(refreshToken).then((session) => {
        return this.validateSession(session);
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

    validateSession(session) {
      this.setState({ busy: true });

      const api = new UserAPI(session.access_token);

      return api.getMe().then((data) => {
        this.setState({ busy: false });

        if (data.error) {
          this.setState({
            ready: false,
            token: null,
          });

          if (auth.canRefresh() && session.refresh_token) {
            return this.refreshSession(session.refresh_token);
          }

          this.purgeSession();

          return false;
        }

        this.setState({
          ready: true,
          token: session.access_token,
        });

        this.saveSession(session);

        return true;
      });
    }

    getSession() {
      return auth.getSession(this.props.storage);
    }

    purgeSession() {
      this.setState({
        busy: false,
        ready: false,
        token: null,
      });

      auth.purgeSession(this.props.storage);
    }

    saveSession(session) {
      const mergedSession = Object.assign({}, this.getSession(), session);

      if (mergedSession.refresh_token) {
        this.queueRefresh(mergedSession.refresh_token, 900);
      }

      auth.putSession(this.props.storage, mergedSession);
    }

    render() {
      const { busy, ready, token } = this.state;

      if (ready) {
        return this.props.render(token);
      }

      // It is important that ready is checked first or
      // user gets thrown out of the UI when refreshing token.
      // Refactor this if it needs to change.
      if (busy) {
        return (
          <Splash>
            <h1>Authorizing...</h1>
          </Splash>
        );
      }

      return <Welcome authURL={auth.createAuthURL()} />;
    }
  }
);
