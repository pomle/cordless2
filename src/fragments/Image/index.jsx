import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { largest } from 'library/image';

import './Image.css';

export class Image extends Component {
  static contextTypes = {
    images: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      image: null,
    };

    this.currentURL = null;

    this.componentWillReceiveProps = this.update;
  }

  componentWillMount() {
    this.update(this.props);
  }

  update({candidates}) {
    if (candidates.size) {
      const image = largest(candidates);
      if (image.url === this.currentURL) {
        return;
      }

      this.setState({
        image: null,
      });

      this.currentURL = image.url;

      this.context.images.get(this.currentURL).then(image => {
        // Ensure the last requested matches the loaded if there is a race.
        if (this.currentURL === image.src) {
          this.setState({ image });
        }
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
