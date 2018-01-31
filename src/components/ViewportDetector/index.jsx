import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Set as ImmutableSet } from 'immutable';

const NO_DISPLAY = {display: 'none'};
const VIEWPORT_WAIT_INTERVAL = 100;
const SCROLL_GRACE_TIMEOUT = 200;

class ViewportDetector extends PureComponent {
  static propTypes = {
    count: PropTypes.number.isRequired,
    onDraw: PropTypes.func.isRequired,
  };

  static contextTypes = {
    viewport: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.seen = new Set();
    this.visible = new ImmutableSet();
  }

  componentDidMount() {
    this.viewportTimer = setInterval(this.waitForViewport, VIEWPORT_WAIT_INTERVAL);
  }

  waitForViewport = () => {
    if (this.context.viewport) {
      this.viewport = this.context.viewport;
      console.log('Viewport found');
      this.viewport.addEventListener('scroll', this.onScroll);

      clearInterval(this.viewportTimer);

      this.pollScroll();
    }
  };

  componentWillUnmount() {
    if (this.viewport) {
      this.viewport.removeEventListener('scroll', this.onScroll);
    }

    clearInterval(this.viewportTimer);
  }

  doUpdate = (s, e) => {
    this.checkInViewItems(s, e);
  };

  onScroll = (event) => {
    this.pollScroll();
  };

  pollScroll = () => {
    clearTimeout(this.checkTimer);

    const start = this.viewport.scrollTop;
    const end = start + this.viewport.offsetHeight * 1.2;

    this.checkTimer = setTimeout(this.doUpdate, SCROLL_GRACE_TIMEOUT, start, end);
  };

  checkInViewItems(startX, endX) {
    const visible = this.visible.clear().withMutations(visible => {
      let index = 0;

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

  handleIndex(index, onDraw) {
    if (this.seen.has(index) || this.visible.has(index)) {
      const child = onDraw(index);
      if (child) {
        this.seen.add(index);
        return <div key={`ready-${index}`} className="item">{child}</div>;
      }
    }

    return <div key={`placeholder-${index}`} className="item placeholder"/>;
  }

  render() {
    const {count, onDraw} = this.props;
    console.log('Rerender');

    const children = [];

    for (let index = 0; index < count; index++) {
      children.push(this.handleIndex(index, onDraw));
    }

    return <Fragment>
      {children}
      <div style={NO_DISPLAY} className="ViewportDetector" ref={node => this.element = node}/>
    </Fragment>;
  }
}

export default ViewportDetector;

