import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Iterable } from 'immutable';

const BUFFER_SIZE = 1;

class VirtualWindow extends PureComponent {
  static propTypes = {
    resultSize: PropTypes.number.isRequired,
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
      rowLen: 10,
      rowHeight: 100,
      containerHeight: 200,
      itemsTop: 0,
      offset: 0,
      end: 0,
    };
  }

  componentDidMount() {
    this.viewport = this.context.viewport;
    this.viewport.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onResize);
    this.calculate();
  }

  componentWillUnmount() {
    this.viewport.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  }

  componentDidUpdate() {
    this.calculateHeight();
  }

  onResize = () => {
    this.calculate();
  }

  onScroll = () => {
    this.calculateOffset();
  }

  calculate() {
    this.calculateHeight();
    this.calculateOffset();
  }

  calculateOffset() {
    this.setState(({rowLen, rowHeight}) => {
      const offsetHeight = this.viewport.offsetHeight;
      const scrollTop = Math.max(0, this.viewport.scrollTop - this.container.offsetTop);

      const chunkHeight = rowHeight * BUFFER_SIZE;
      const offset = Math.floor(scrollTop / chunkHeight) * rowLen * BUFFER_SIZE;
      const rows = Math.floor(offsetHeight / rowHeight) + BUFFER_SIZE + 1;
      const last = offset + rows * rowLen;

      return {
        itemsTop: scrollTop + -(scrollTop % chunkHeight),
        offset,
        last,
      };
    });
  }

  calculateHeight() {
    const children = this.itemsNode.children;
    const len = children.length;

    for (let i = 1; i < len; ++i) {
      const a = children[i];
      const b = children[i - 1];
      if (a.offsetTop > b.offsetTop) {
        const rowLen = i;
        const rowHeight = a.offsetTop - b.offsetTop;
        this.setState({
            rowHeight,
            rowLen,
            containerHeight: rowHeight * this.props.resultSize / rowLen,
        });
        return;
      }
    }
  }

  render() {
    const { resultSize, items, onDraw, onMissing } = this.props;
    const { containerHeight, itemsTop, offset, last } = this.state;
    const end = isFinite(resultSize) ? Math.min(resultSize, last) : last;

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
        <ItemRenderer
          items={items}
          start={offset}
          end={end}
          onDraw={onDraw}
          onMissing={onMissing}
        />
      </div>
    </div>;
  }
}

class ItemRenderer extends PureComponent {
  renderItem(items, index) {
    const item = items.get(index);
    const classes = ['item'];
    let content;

    if (item && item.ready) {
      classes.push('ready');
      content = this.props.onDraw(item.content);
    } else {
      classes.push('pending');
      content = this.props.onMissing(index);
    }

    return <div className={classes.join(' ')} key={index}>{content}</div>;
  }

  render() {
    const {items, start, end} = this.props;

    const children = [];
    for (let index = start; index < end; ++index) {
      children.push(this.renderItem(items, index));
    }

    return children;
  }
}

export default VirtualWindow;

