import React, { Component } from 'react';
import BlockScroll from 'components/BlockScroll';

const PAGE_LEN = 50;

class Yxa extends Component {
  componentDidMount() {
    this.onProps(this.props);
  }

  componentWillReceiveProps(props) {
    this.onProps(props);
  }

  onProps() {
    this.fetch(0);
  }

  async fetch(offset = 0) {
    this.props.fetcher(offset, PAGE_LEN);
  }

  onMissing = (missing) => {
    clearTimeout(this.timer);

    const first = missing;
    let offset = first - (first % PAGE_LEN);
    this.timer = setTimeout(() => {
      this.fetch(offset);
    }, 100);

    return this.props.placeholder;
  }

  render() {
    const {render, collection} = this.props;

    return <BlockScroll
      count={collection.total}
      items={collection.items}
      onMissing={this.onMissing}
      onDraw={render}
    />
  }
}

export default Yxa;
