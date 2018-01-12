import React, { Component } from 'react';

import './Image.css';

function largest(images) {
  let largest = images[0];
  for (const image in images) {
    if (image.width > largest.width) {
      largest = image;
    }
  }
  return largest;
}

export class Image extends Component {
  render() {
    const {candidates} = this.props;

    const style = {};
    if (candidates.length) {
      style.backgroundImage = `url(${largest(candidates).url})`;
    }

    return (
      <div className="Image" style={style}>
        {this.props.children}
      </div>
    );
  }
}
