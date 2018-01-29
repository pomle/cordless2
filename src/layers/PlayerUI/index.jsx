import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { Navigation } from './Navigation';
import Playback from 'views/Playback';

import './Animation.css';
import './PlayerUI.css';

class Viewport extends Component {
  static childContextTypes = {
    scroll: PropTypes.object,
    viewport: PropTypes.object,
  };

  componentDidMount() {
    this.viewport.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    this.viewport.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  }

  onResize = (event) => {
    console.log('Resize', event);
  }

  onScroll = (event) => {
    //console.log('Scroll', event);
    this.scroll = event;
  }

  getChildContext() {
    return {
      scroll: this.scroll,
      viewport: this.viewport,
    };
  }

  render() {
    return <div className="viewport" ref={node => this.viewport = node}>
      {this.props.children}
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
