import React, { Component } from 'react';

import {Image} from 'fragments/Image';

import './ViewHeader.css';

export class ViewHeader extends Component {
  render() {
    const { caption, images } = this.props;

    return (
      <header className="ViewHeader">
        <div className="image">
          <Image candidates={images}/>
        </div>

        <h2>{caption}</h2>
      </header>
    );
  }
}
