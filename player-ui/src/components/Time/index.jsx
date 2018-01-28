import React, { Component } from 'react';

const MINUTE = 60;

export class Time extends Component {
  render() {
    const { seconds } = this.props;

    const m = Math.floor(seconds / MINUTE);
    const s = Math.floor(seconds - m * MINUTE);

    return (
      <div className="Time">
        {m.toString().padStart(2, '0')}:{s.toString().padStart(2, '0')}
      </div>
    );
  }
}
