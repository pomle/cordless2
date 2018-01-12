import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import { Surface } from 'gl-react-dom';

import { Pontus } from '../shaders';
import { BetterBlur as Blur } from '../shaders/blur';


export class Backdrop extends Component {
  render() {
    const { promote, image, pulse } = this.props;
    return <div className="Backdrop">
      <Surface width={400} height={400}>
        <Motion
          defaultStyle={{
            factor: 0,
          }}
          style={{
            factor: spring(promote ? 0 : 1, { stiffness: 70, damping: 5 }),
          }}
        >
          {({ factor, thickness}) => {
            return (
              <Blur passes={2} factor={factor * 3}>
                <Pontus
                  thickness={pulse}
                  timeSpeed={0.1}
                  spacing={0.2}
                >
                  <Blur passes={4} factor={10}>
                    {image}
                  </Blur>
                </Pontus>
              </Blur>
            );
          }}
        </Motion>
      </Surface>
    </div>;
  }
}
