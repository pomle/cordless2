import React, { Component } from 'react';

import './Image.css';

export class Image extends Component {
  render() {
    const {candidates} = this.props;
    const imageURL = candidates.length
          ? candidates[0].url
          : 'http://mattislist.com/marketingapp/postimage/noimageavailable.png';

    const style = {
        backgroundImage: `url(${imageURL})`,
    };

    return (
      <div className="Image" style={style}>
        {this.props.children}
      </div>
    );
  }
}
