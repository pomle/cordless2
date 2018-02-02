import React, { Component } from 'react';
import { connect } from 'react-redux';
import BlockScroll from 'components/BlockScroll';
import {addItems, setTotal} from 'store/store/stash';

const PAGE_LEN = 50;

class Yxa extends Component {
  constructor(props) {
    super(props);

    this.touched = new Set();
  }

  componentDidMount() {
    this.onProps(this.props);
  }

  componentWillReceiveProps(props) {
    this.onProps(props);
  }

  onProps({stash}) {
    if (stash.total === null) {
      this.fetch(0);
    }
  }

  async fetch(offset = 0) {
    const {namespace, fetcher, setTotal, addItems} = this.props;

    for (let index = offset; index < offset + PAGE_LEN; index++) {
      this.touched.add(index);
    }

    console.log('Fetching', namespace)
    const response = await fetcher(offset, PAGE_LEN);

    console.log('Response total', response.total);

    setTotal(namespace, response.total);
    addItems(namespace, offset, response.items);
  }

  onMissing = (missing) => {
    clearTimeout(this.timer);

    console.log('Testing', missing);
    if (this.touched.has(missing)) {
      console.log('Ignoring', missing);
      return;
    }

    console.log('Missing', missing);
    const first = missing;

    let offset = first - (first % PAGE_LEN);

    this.timer = setTimeout(() => {
        this.fetch(offset);
    }, 100);
  }

  render() {
    const {render, stash} = this.props;

    return <BlockScroll
      count={stash.total || 0}
      items={stash.items}
      onMissing={this.onMissing}
      onDraw={render}
    />
  }
}

export default connect((state, props) => {
  return {
    stash: state.stash.get(props.namespace),
  };
},
{
  addItems,
  setTotal,
})(Yxa);
