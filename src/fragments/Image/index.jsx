import React, { Component } from 'react';

import './Image.css';

export class Image extends Component {
  constructor(props) {
    super(props);

    this.state = {
        imageURL: props.candidates.length
          ? props.candidates[0].url
          : 'http://mattislist.com/marketingapp/postimage/noimageavailable.png'
    };
  }

  componentDidMount() {
    this.setState({loaded: true});
  }

  render() {
    const {imageURL, loaded} = this.state;

    const style = {
        backgroundImage: `url(${imageURL})`,
        opacity: loaded ? 1 : 0,
    };

    return (
      <div className="Image" style={style}>
        {this.props.children}
      </div>
    );
  }
}
