import React, { PureComponent } from 'react';
import raf from 'raf';
import hoistNonReactStatics from 'hoist-non-react-statics';

// NB this is only an utility for the examples
export function timed(C, refreshRate = 60) {
  class TL extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        time: 0,
        tick: 0,
      };
    }

    componentDidMount() {
      let startTime: number, lastTime: number;
      let interval = 1000 / refreshRate;
      lastTime = -interval;
      const loop = (t: number) => {
        this._r = raf(loop);
        if (!startTime) startTime = t;
        if (t - lastTime > interval) {
          lastTime = t;
          this.setState({
            time: t - startTime,
            tick: this.state.tick + 1,
          });
        }
      };
      this._r = raf(loop);
    }

    componentWillUnmount() {
      raf.cancel(this._r);
    }

    render() {
      return <C {...this.props} {...this.state} />;
    }
  }

  hoistNonReactStatics(TL, C);

  return TL;
}
