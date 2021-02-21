import React, { Component } from 'react';

import './ViewContainer.css';

export class ViewContainer extends Component {
  render() {
    return <div className="ViewContainer">{this.props.children}</div>;
  }
}
