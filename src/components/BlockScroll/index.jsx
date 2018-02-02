import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Iterable } from 'immutable';

const VIEWPORT_WAIT_INTERVAL = 10;

class BlockScrollItems extends PureComponent {
  renderItem(items, index) {
    const item = items.get(index);
    if (item) {
      return this.props.onDraw(item);
    }
    this.props.onMissing(index);
    return <div className="Playlist"/>;
  }

  render() {
    console.log('Rendering children', this.props);
    const {items, offset, end} = this.props;

    const children = [];
    for (let index = offset; index < end; ++index) {
      children.push(<div className="item" key={index}>{this.renderItem(items, index)}</div>);
    }

    return children;
  }
}

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
      containerHeight: 200,
      itemsTop: 0,
      offset: 0,
      end: 0,
    };
  }

  componentWillMount() {
    this.viewportTimer = setInterval(this.waitForViewport, VIEWPORT_WAIT_INTERVAL);
  }

  componentWillUnmount() {
    this.viewport.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  }

  waitForViewport = () => {
    if (this.context.viewport) {
      this.viewport = this.context.viewport;
      this.viewport.addEventListener('scroll', this.onScroll);
      window.addEventListener('resize', this.onResize);

      clearInterval(this.viewportTimer);

      this.calculateState(this.viewport, this.container);
    }
  };

  onResize = event => {
    this.calculateState(this.viewport, this.container);
  }

  onScroll = event => {
    this.calculateState(this.viewport, this.container);
  }

  calculateState(viewport, container) {
    const {count} = this.props;
    const {rowLen, rowHeight} = this.calculateLines();
    console.log(rowLen, rowHeight);

    const offsetHeight = viewport.offsetHeight;
    const scrollTop = Math.max(0, viewport.scrollTop - container.offsetTop);

    const offset = Math.floor(scrollTop / rowHeight) * rowLen;
    const rows = Math.floor(offsetHeight / rowHeight) + 2;
    const end = Math.min(count, offset + rows * rowLen);

    this.setState({
      containerHeight: rowHeight * count / rowLen,
      itemsTop: scrollTop + -(scrollTop % rowHeight),
      offset,
      end,
    });
  }

  calculateLines() {
    const children = this.itemsNode.children;
    const len = children.length;

    for (let i = 1; i < len; ++i) {
      const a = children[i];
      const b = children[i - 1];
      if (a.offsetTop > b.offsetTop) {
        return {
          rowHeight: a.offsetTop - b.offsetTop,
          rowLen: i,
        };
      }
    }

    return {
      rowHeight: 100,
      rowLen: 1,
    };
  }

  render() {
    const { items, onDraw, onMissing } = this.props;
    const { containerHeight, itemsTop, offset, end } = this.state;

    const containerStyle = {
      height: `${containerHeight}px`,
      position: 'relative',
    };

    const itemsStyle = {
      position: 'absolute',
      top: `${itemsTop}px`,
    };

    return <div className="container" style={containerStyle} ref={node => this.container = node}>
      <div className="items" style={itemsStyle} ref={node => this.itemsNode = node}>
        <BlockScrollItems
          items={items}
          offset={offset}
          end={end}
          onDraw={onDraw}
          onMissing={onMissing}
        />
      </div>
    </div>;
  }
}

export default BlockScroll;

