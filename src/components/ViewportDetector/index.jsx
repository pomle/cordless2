import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Set } from 'immutable';

class ViewportDetector extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  static contextTypes = {
    viewport: PropTypes.object,
  };

  componentDidMount() {
    this.visible = new Set();
    this.timer = setInterval(this.pollScroll, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  pollScroll = () => {
    if (this.context.viewport) {
      const start = this.context.viewport.scrollTop;
      console.log(start);
      const end = start + this.context.viewport.offsetHeight;
      this.checkInViewItems(start, end);
    }
  };

  checkInViewItems(startX, endX) {
    const visible = this.visible.clear().withMutations(visible => {

      let index = 0;
      for (const child of this.element.children) {
        const childStart = child.offsetTop;
        const childEnd = childStart + child.offsetHeight;
        if (childStart < endX && childEnd > startX) {
          visible.add(index);
        }
        index++;
      }
    });

    if (!this.visible.equals(visible)) {
      this.props.onChange(visible);
      this.visible = visible;
    }
  }

  render() {
    return <div className="ViewportDetector" ref={node => this.element = node}>
      {this.props.children}
    </div>;
  }
}

export default ViewportDetector;

