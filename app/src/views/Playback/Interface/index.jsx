import React, { Component } from 'react';
import {Map} from 'immutable';

import * as icon from 'assets/icons';

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

function Button({title, graphic, onClick}) {
  return <button onClick={onClick} title={title}>
    <img src={graphic} alt={title}/>
  </button>
}

export class Interface extends Component {
  render() {
    const {prev, toggle, next, shuffle, repeat, context} = this.props;

    return (
      <div className="Interface">
        <div className={`toggle ${context.paused ? 'paused' : 'playing'}`}>
          <div className="play">
            <Button onClick={toggle} title="Play" graphic={icon.play}/>
          </div>
          <div className="pause">
            <Button onClick={toggle} title="Pause" graphic={icon.pause}/>
          </div>
        </div>
        <div className="previous">
          <Button onClick={prev} title="Previous" graphic={icon.prev}/>
        </div>
        <div className="next">
          <Button onClick={next} title="Next" graphic={icon.next}/>
        </div>
        <div className="shuffle">
          <Button onClick={shuffle}
            title={SHUFFLE_MAP.get(context.shuffle, 'Shuffle')}
            graphic={icon.shuffle}
          />
        </div>
        <div className="repeat">
          <Button onClick={repeat}
            title={REPEAT_MAP.get(context.repeat_mode, 'Repeat')}
            graphic={icon.repeatAll}
          />
        </div>
      </div>
    );
  }
}
