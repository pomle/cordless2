import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Navigation } from "./Navigation";
import { Accenter } from "./Accenter";
import Playback from "views/Playback";

import "./Animation.css";
import "./PlayerUI.css";

class Viewport extends Component {
  static childContextTypes = {
    viewport: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      mounted: false,
    };
  }

  componentDidMount() {
    this.setState({
      mounted: true,
    });
  }

  getChildContext() {
    return {
      viewport: this.viewport,
    };
  }

  render() {
    return (
      <div className="viewport" ref={(node) => (this.viewport = node)}>
        {this.state.mounted ? this.props.children : null}
      </div>
    );
  }
}

export class PlayerUI extends Component {
  render() {
    return (
      <div className="PlayerUI">
        <Accenter />
        <Viewport>
          <div className="compass">
            <Link component="button" to="/search">
              Search
            </Link>
            <Link component="button" to="/playlists">
              Playlists
            </Link>
            <Link component="button" to="/track-info">
              Stats
            </Link>
          </div>
          <Navigation />
        </Viewport>

        <div className="playback">
          <Playback />
        </div>
      </div>
    );
  }
}
