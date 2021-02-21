import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Set as ImmutableSet, Iterable } from 'immutable';

const NO_DISPLAY = {display: 'none'};
const VIEWPORT_WAIT_INTERVAL = 10;
const SCROLL_GRACE_TIMEOUT = 50;

class ViewportDetector extends PureComponent {
  static propTypes = {
    count: PropTypes.number.isRequired,
    items: PropTypes.instanceOf(Iterable).isRequired,
    onDraw: PropTypes.func.isRequired,
    onMissing: PropTypes.func.isRequired,
  };

  static contextTypes = {
    viewport: PropTypes.object,
  };

  constructor(props) {
    super(props);

    console.log('afafgag');
    this.visible = new ImmutableSet();
    this.children = null;
  }

  componentWillMount() {
    this.viewportTimer = setInterval(this.waitForViewport, VIEWPORT_WAIT_INTERVAL);
  }

  waitForViewport = () => {
    if (this.context.viewport) {
      this.viewport = this.context.viewport;
      console.log('Viewport found');

      this.viewport.addEventListener('scroll', this.onScroll);
      window.addEventListener('resize', this.onScroll);

      clearInterval(this.viewportTimer);

      this.pollScroll();
    }
  };

  componentWillUnmount() {
    if (this.viewport) {
      this.viewport.removeEventListener('scroll', this.onScroll);
      window.removeEventListener('resize', this.onScroll);
    }

    clearInterval(this.viewportTimer);
  }

  doUpdate = (s, e) => {
    this.detectVisible(s, e);
  };

  onScroll = (event) => {
    this.pollScroll();
  };

  pollScroll = () => {
    clearTimeout(this.checkTimer);

    const vh = this.viewport.offsetHeight;
    const start = this.viewport.scrollTop - vh;
    const end = start + vh * 3;

    this.checkTimer = setTimeout(this.doUpdate, SCROLL_GRACE_TIMEOUT, start, end);
  };

  detectVisible(startX, endX) {
    const visible = this.visible.clear().withMutations(visible => {
      let index = 0;

      const children = this.element.parentNode.children;
      for (let i = 0; i < children.length - 1; ++i) {
        const child = children[i];
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

  componentWillReceiveProps(props) {
    console.log('CWRP', props);
  }

  componentWillUpdate({count, items, onDraw}) {
    const children = [];
    const missing = [];

    for (let index = 0; index < count; index++) {
      let child;

      if (this.visible.has(index)) {
        const item = items.get(index);
        if (item !== undefined) {
          child = <div key={`item-${index}`} className="item visible">
            {onDraw(item)}
          </div>;
        } else {
          missing.push(index);
        }
      }

      if (!child) {
        child = <div key={`item-${index}`} className="item">
          <div/>
        </div>;
      }

      children.push(child);
    }

    if (missing.length) {
      this.props.onMissing(missing);
    }

    this.children = children;
  }

  render() {
    console.log('Rerender', this.props, this.children);

    return <Fragment>
      {this.children}
      <div style={NO_DISPLAY} className="ViewportDetector" ref={node => this.element = node}/>
    </Fragment>;
  }
}

export default ViewportDetector;

