import React, { Component } from 'react';
import { PlayableList } from 'components/PlayableList';

import './PlaylistList.css';

export class PlaylistList extends Component {
  render() {
    return (
      <div className="PlaylistList">
        <PlayableList>
          {this.props.children}
        </PlayableList>
      </div>
    );
  }
}
