import React, { Component } from 'react';

import './TrackList.css';

export class TrackList extends Component {
  render() {
    return <div className="TrackList">{this.props.children}</div>;
  }
}
