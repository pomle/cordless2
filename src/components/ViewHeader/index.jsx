import React, { Component } from 'react';

import {Image} from 'fragments/Image';

import './ViewHeader.css';

export class ViewHeader extends Component {
  render() {
    const { caption, images } = this.props;

    return (
      <header className="ViewHeader">
        { images
          ? <div className="image">
            <Image candidates={images}/>
          </div>
          : null
        }

        <h2>{caption}</h2>
      </header>
    );
  }
}
