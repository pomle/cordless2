import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Set as ImmutableSet } from 'immutable';

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

    this.state = {
      visible: new ImmutableSet(),
    }
  }

  componentDidMount() {
    this.timer = setInterval(this.pollScroll, 500);
  }

  componentWillReceiveProps(nextProps) {
    console.log('CWRP', nextProps);
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
    const visible = this.state.visible.clear().withMutations(visible => {

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

    if (!this.state.visible.equals(visible)) {
      this.setState({visible});
    }
  }

  handleIndex(index, onDraw) {
    if (this.seen.has(index) || this.state.visible.has(index)) {
      const child = onDraw(index);
      if (child) {
        this.seen.add(index);
        return child;
      }
    }

    return <div key={`placeholder-${index}`} className="placeholder"/>;
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
      <div style={{display: 'none'}} className="ViewportDetector" ref={node => this.element = node}/>
    </Fragment>;
  }
}

export default ViewportDetector;

