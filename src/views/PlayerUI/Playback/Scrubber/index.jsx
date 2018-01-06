import React, { Component } from 'react';

import {ProgressBar} from 'components/ProgressBar';

import './Scrubber.css';

export class Scrubber extends Component {
  handleClick = (event) => {
    console.log(event.nativeEvent);
  }

  render() {
    const {player, playbackAPI} = this.props;
    const {context} = player;
    console.log(context.duration, context.position);

    const progress = context.duration
      ? context.position / context.duration
      : 0;

    return (
      <div className="Scrubber" onClick={this.handleClick}>
        <ProgressBar value={progress}/>
      </div>
    );
  }
}
