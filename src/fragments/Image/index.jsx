import React, { Component } from 'react';
import './Image.css';

export class Image extends Component {

  componentDidMount() {
    const {candidates} = this.props;
    if (!candidates.size) {
      return;
    }
    const url = candidates.getIn([0, 'url']);

    this.image = new window.Image();
    this.image.addEventListener('load', this.insert);
    this.image.src = url;
  }

  componentWillUnmount() {
    if (this.image) {
      this.image.removeEventListener('load', this.insert);
    }
  }

  insert = () => {
    this.node.appendChild(this.image);
  }

  render() {
    return (
      <div className="Image" ref={node => this.node = node}/>
    );
  }
}
