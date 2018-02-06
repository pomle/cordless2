import React, { PureComponent } from 'react';
import './Image.css';

const BIG = 640;
const MEDIUM = 300;

export class Image extends PureComponent {
  render() {
    const {candidates} = this.props;
    if (!candidates.size) {
      return null;
    }

    const images = candidates.groupBy(image => image.get('width'));
    const image = images.getIn([MEDIUM, 0]) || images.getIn([BIG, 0]) || candidates.get(0);

    const url = image && image.get('url');
    return <ImageSurface key={url} url={url}/>
  }
}

class ImageSurface extends PureComponent {
  componentDidMount() {
    this.image = new window.Image();
    this.image.addEventListener('load', this.insert);
    this.image.src = this.props.url;
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
