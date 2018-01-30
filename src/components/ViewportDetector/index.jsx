import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Set } from 'immutable';

class ViewportDetector extends PureComponent {
  static propTypes = {
    count: PropTypes.number.isRequired,
    onDraw: PropTypes.func.isRequired,
  };

  static contextTypes = {
    viewport: PropTypes.object,
  };

  componentWillMount() {
    this.visible = new Set();
  }

  componentDidMount() {
    this.timer = setInterval(this.pollScroll, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  pollScroll = () => {
    if (this.context.viewport) {
      const start = this.context.viewport.scrollTop;
      const end = start + this.context.viewport.offsetHeight;
      this.checkInViewItems(start, end);
    }
  };

  checkInViewItems(startX, endX) {
    const visible = this.visible.clear().withMutations(visible => {

      let index = -1;
      for (const child of this.element.parentNode.children) {
        const childStart = child.offsetTop;
        const childEnd = childStart + child.offsetHeight;
        if (childStart < endX && childEnd > startX) {
          visible.add(index);
        }
        index++;
      }
    });

    if (!this.visible.equals(visible)) {
      this.visible = visible;
      this.forceUpdate();
    }
  }

  render() {
    const {count, onDraw} = this.props;

    const children = [];

    for (let i = 0; i < count; i++) {
      children.push(onDraw(i, this.visible.has(i)));
    }

    return <Fragment>
      <div className="ViewportDetector" ref={node => this.element = node}/>
      {children}
    </Fragment>;
  }
}

export default ViewportDetector;

