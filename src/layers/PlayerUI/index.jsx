import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { Navigation } from './Navigation';
import Playback from 'views/Playback';

import './Animation.css';
import './PlayerUI.css';

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
    return <div className="viewport" ref={node => this.viewport = node}>
      {this.state.mounted ? this.props.children : null}
    </div>;
  }
}

export class PlayerUI extends Component {
  render() {
    return (
      <div className="PlayerUI">
        <Viewport>
          <Navigation />
        </Viewport>

        <div className="playback">
          <Playback />
        </div>
      </div>
    );
  }
}
