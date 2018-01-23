import React, { Component } from 'react';
import {Map} from 'immutable';

import './Interface.css';

const REPEAT_MAP = new Map([
  [0, 'Repeat Off'],
  [1, 'Repeat All'],
  [2, 'Repeat One'],
]);

const SHUFFLE_MAP = new Map([
  [false, 'Shuffle Off'],
  [true, 'Shuffle On'],
]);

export class Interface extends Component {
  render() {
    const {prev, toggle, next, shuffle, repeat, context} = this.props;

    return (
      <div className="Interface">
        <div className="previous">
          <button onClick={prev}>Prev</button>
        </div>
        <div className="toggle">
          <button onClick={toggle}>Play/Pause</button>
        </div>
        <div className="next">
          <button onClick={next}>Next</button>
        </div>
        <div className="shuffle">
          <button onClick={shuffle}>{SHUFFLE_MAP.get(context.shuffle, 'Shuffle')}</button>
        </div>
        <div className="repeat">
          <button onClick={repeat}>{REPEAT_MAP.get(context.repeat_mode, 'Repeat')}</button>
        </div>
      </div>
    );
  }
}
