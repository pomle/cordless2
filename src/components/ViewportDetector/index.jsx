import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Set as ImmutableSet, Iterable } from 'immutable';

const NO_DISPLAY = {display: 'none'};
const VIEWPORT_WAIT_INTERVAL = 100;
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

    this.seen = new Map();
    this.visible = new ImmutableSet();
    this.children = null;
    this.allowUpdate = true;
  }

  componentDidMount() {
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
      this.allowUpdate = false;
    }
  }

  componentWillUpdate({count, items, onDraw}) {
    const children = [];
    const missing = [];

    for (let index = 0; index < count; index++) {
      let child;

      if (this.visible.has(index)) {
        if (this.seen.has(index)) {
          child = this.seen.get(index);
        } else {
          const item = items.get(index);
          if (item !== undefined) {
            child = <div key={`ready-${index}`} className="item">
              {onDraw(item)}
            </div>;
            this.seen.set(child);
          } else {
            missing.push(index);
          }
        }
      } else {
        child = <div key={`placeholder-${index}`} className="item placeholder"/>;
      }

      children.push(child);
    }

    if (missing.length) {
      this.props.onMissing(missing);
    }

    this.children = children;
  }

  shouldComponentUpdate({items}) {
    return this.allowUpdate || items !== this.props.items;
  }

  render() {
    console.log('Rerender');

    return <Fragment>
      {this.children}
      <div style={NO_DISPLAY} className="ViewportDetector" ref={node => this.element = node}/>
    </Fragment>;
  }
}

export default ViewportDetector;

