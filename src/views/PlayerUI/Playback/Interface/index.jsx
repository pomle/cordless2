import React, { Component } from 'react';

import './Interface.css';

export class Interface extends Component {
  toggle = () => {
    const {context} = this.props.player;
    if (context.paused) {
      this.props.playbackAPI.resume();
    } else {
      this.props.playbackAPI.pause();
    }
  }

  next = () => {
    this.props.playbackAPI.next();
  }

  prev = () => {
    this.props.playbackAPI.prev();
  }

  render() {
    return (
      <div className="Interface">
        <div className="previous">
          <button onClick={this.prev}>Prev</button>
        </div>
        <div className="toggle">
          <button onClick={this.toggle}>Play/Pause</button>
        </div>
        <div className="next">
          <button onClick={this.next}>Next</button>
        </div>
      </div>
    );
  }
}
