import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
  static contextTypes = {
    images: PropTypes.object,
  };

  constructor(props, {images}) {
    super(props);

    this.state = {
      image: null,
    };

    if (props.candidates.length) {
      const image = largest(props.candidates);
      images.get(image.url).then(image => {
        this.setState({image});
      });
    }
  }

  render() {
    const { image } = this.state;

    const classes = ['Image'];

    const style = {};
    if (image) {
      classes.push('ready');
      style.backgroundImage = `url(${image.src})`;
    }

    return (
      <div className={classes.join(' ')} style={style}>
        {this.props.children}
      </div>
    );
  }
}
