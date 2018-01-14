import React, { Component } from 'react';

import { ProgressBar } from 'components/ProgressBar';
import { Sections } from './Sections';

import './Scrubber.css';

export class Scrubber extends Component {
  handleClick = ({ nativeEvent, currentTarget }) => {
    const { context: { duration }, seek } = this.props;
    const fraction = nativeEvent.offsetX / currentTarget.offsetWidth;
    const time = duration * fraction;
    const ms = time.toFixed();
    seek(ms);
  };

  render() {
    const { context, analysis } = this.props;

    const progress = context.duration ? context.position / context.duration : 0;

    return (
      <div className="Scrubber" onClick={this.handleClick}>
        <ProgressBar value={progress} />
        <Sections sections={analysis ? analysis.sections : null} />
      </div>
    );
  }
}
