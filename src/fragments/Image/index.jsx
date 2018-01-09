import React, { Component } from 'react';

import './Image.css';

export class Image extends Component {
  render() {
    const {candidates} = this.props;

    const style = {};
    if (candidates.length) {
      style.backgroundImage = `url(${candidates[0].url})`;
    }

    return (
      <div className="Image" style={style}>
        {this.props.children}
      </div>
    );
  }
}
