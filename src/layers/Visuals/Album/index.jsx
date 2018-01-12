import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import { Surface } from 'gl-react-dom';

import { BetterBlur as Blur } from '../shaders/blur';

export class Album extends Component {
  render() {
    const { promote, image } = this.props;
    return <div className="Album">
      <Surface width={400} height={400}>
        <Motion
          defaultStyle={{ factor: 0 }}
          style={{ factor: spring(promote ? 0 : 4) }}
        >
          {({ factor }) => (
            <Blur passes={4} factor={factor}>
              {image}
            </Blur>
          )}
        </Motion>
      </Surface>
    </div>;
  }
}
