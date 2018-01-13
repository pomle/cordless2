import React, { Component } from 'react';

import './PlayableList.css';

export class PlayableList extends Component {
  render() {
    return (
      <div className="PlayableList">
        {this.props.children}
      </div>
    );
  }
}
