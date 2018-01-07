import React, { Component } from 'react';

import './Interface.css';

export class Interface extends Component {
  render() {
    return (
      <div className="Interface">
        <div className="previous">
          <button onClick={this.props.prev}>Prev</button>
        </div>
        <div className="toggle">
          <button onClick={this.props.toggle}>Play/Pause</button>
        </div>
        <div className="next">
          <button onClick={this.props.next}>Next</button>
        </div>
      </div>
    );
  }
}
