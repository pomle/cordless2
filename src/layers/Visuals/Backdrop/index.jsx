import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import { Surface } from 'gl-react-dom';

import { Pontus } from '../shaders';
import { BetterBlur as Blur } from '../shaders/blur';


export class Backdrop extends Component {
  render() {
    //console.log('Visual props', this.props);
    const { promote, image, loudness, pulse } = this.props;
    return <div className="Backdrop">
      <Surface width={400} height={400}>
        <Motion
          defaultStyle={{
            factor: 0,
            thickness: 0,
            loudness: 0,
            spacing: 0.2,
          }}
          style={{
            factor: spring(promote ? 0 : 1, { stiffness: 70, damping: 5 }),
            loudness: spring(loudness),
            thickness: spring(Math.max(0.1, pulse * loudness)),
            spacing: spring(loudness ** 2 + 0.4, {
              stiffness: 30,
              damping: 60,
              precision: 0.0001,
            }),
          }}
        >
          {({ factor, thickness, loudness, spacing }) => {
            return (
              <Blur passes={2} factor={factor * 3}>
                <Pontus
                  thickness={thickness}
                  timeSpeed={Math.max(0.01, loudness * loudness * loudness)}
                  spacing={spacing}
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
