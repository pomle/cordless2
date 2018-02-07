import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Iterable } from 'immutable';
import LazyDraw from './LazyDraw';

const BUFFER_SIZE = 3;

class VirtualWindow extends PureComponent {
  static propTypes = {
    resultSize: PropTypes.number.isRequired,
    items: PropTypes.instanceOf(Iterable).isRequired,
    onDraw: PropTypes.func.isRequired,
    onMissing: PropTypes.func.isRequired,
    onPlaceholder: PropTypes.func.isRequired,
  };

  static contextTypes = {
    viewport: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);

    this.needsRecalculate = true;

    this.state = {
      rowLen: null,
      rowHeight: null,
      containerHeight: 0,
      itemsTop: 0,
      offset: 0,
      length: 2,
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
    if (this.needsRecalculate) {
      this.calculateHeight();
    }
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
      if (!rowLen) {
        return;
      }

      const scrollTop = Math.max(0, this.viewport.scrollTop - this.container.offsetTop);
      const offset = Math.floor(scrollTop / rowHeight) * rowLen;

      return {
        itemsTop: scrollTop + -(scrollTop % rowHeight),
        offset,
      };
    });
  }

  calculateHeight() {
    const children = this.itemsNode.children;
    const length = children.length;

    for (let i = 1; i < length; ++i) {
      const a = children[i];
      const b = children[i - 1];
      if (a.offsetTop > b.offsetTop) {
        const rowLen = i;
        const rowHeight = a.offsetTop - b.offsetTop;
        const offsetHeight = this.viewport.offsetHeight;
        const rowCount = Math.floor(offsetHeight / rowHeight);
        const length = (rowCount + BUFFER_SIZE) * rowLen;
        this.setState({
            rowHeight,
            rowLen,
            length,
            containerHeight: rowHeight * this.props.resultSize / rowLen,
        });
        this.needsRecalculate = false;
        return;
      }
    }

    this.setState({
      length: length + 3,
    });
  }

  render() {
    const { resultSize, items, onDraw, onPlaceholder, onMissing } = this.props;
    const { containerHeight, itemsTop, offset, length } = this.state;
    const last = offset + length;
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
          onPlaceholder={onPlaceholder}
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
      content = <LazyDraw
        placeholder={this.props.onPlaceholder}
        render={this.props.onDraw(item.content)}
      />;
    } else {
      classes.push('pending');
      this.props.onMissing(index);
      content = this.props.onPlaceholder(index);
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

