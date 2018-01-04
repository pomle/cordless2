import React, { Component } from 'react';

export class Track extends Component {
  play = () => {
    this.props.play(this.props.track);
  };

  render() {
    const { track } = this.props;

    return (
      <div className="Track">
        <button onClick={this.play}>Play</button>
        {track.name}
      </div>
    );
  }
}
