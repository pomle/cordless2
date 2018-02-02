import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Iterable } from 'immutable';

const VIEWPORT_WAIT_INTERVAL = 10;

class BlockScroll extends PureComponent {
  static propTypes = {
    count: PropTypes.number.isRequired,
    items: PropTypes.instanceOf(Iterable).isRequired,
    onDraw: PropTypes.func.isRequired,
    onMissing: PropTypes.func.isRequired,
  };

  static contextTypes = {
    viewport: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      scrollTop: 0,
      offsetHeight: 500,
    };
  }

  componentWillMount() {
    this.viewportTimer = setInterval(this.waitForViewport, VIEWPORT_WAIT_INTERVAL);
  }

  waitForViewport = () => {
    console.log(this.context);
    if (this.context.viewport) {
      this.viewport = this.context.viewport;
      this.viewport.addEventListener('scroll', this.onScroll);
      //window.addEventListener('resize', this.onScroll);

      clearInterval(this.viewportTimer);
    }
  };

  onScroll = event => {
    console.log(event);
    this.setState(prevState => ({
      scrollTop: event.target.scrollTop,
      offsetHeight: event.target.offsetHeight,
    }));
  };

  componentDidMount() {
    /*window.addEventListener('mousewheel', event => {
      console.log(event);
      this.setState(prevState => ({
        scroll: Math.max(0, prevState.scroll + (event.deltaY > 0 ? 100 : - 100)),
      }));
    });*/
  }

  render() {
    const {count, items, onDraw, onMissing} = this.props;
    const { scrollTop, offsetHeight } = this.state;

    const rowLen = 4;
    const rowHeight = 112;
    const offset = Math.floor(scrollTop / rowHeight) * rowLen;
    const rows = (offsetHeight / rowHeight) + 2;
    const limit = rows * rowLen;

    console.log(scrollTop, offset);

    function renderItem(items, index) {
      const item = items.get(index);
      if (item) {
        return onDraw(item);
      }
      onMissing(index);
      return <div className="Playlist"/>;
    }

    const children = [];
    for (let index = offset, end = offset + limit; index < end; index++) {
      children.push(<div className="item" key={index}>{renderItem(items, index)}</div>);
    }

    const containerStyle = {
      height: `${rowHeight * count / rowLen}px`,
      position: 'relative',
    };

    const itemsStyle = {
      position: 'absolute',
      top: `${scrollTop + -(scrollTop % rowHeight)}px`,
    };

    return <div className="container" style={containerStyle}>
      <div className="items" style={itemsStyle} ref={node => this.items = node}>
        {children}
      </div>
    </div>;
  }
}

export default BlockScroll;

