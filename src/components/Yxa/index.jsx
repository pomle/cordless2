import React, { Component } from 'react';
import { connect } from 'react-redux';
import ViewportDetector from 'components/ViewportDetector';
import {addItems, setTotal} from 'store/store/stash';

const PAGE_LEN = 50;

class Yxa extends Component {
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

    console.log(`Fetching offset ${offset}`);
    const response = await fetcher(offset, PAGE_LEN);

    console.log('Response total', response.total);

    setTotal(namespace, response.total);
    addItems(namespace, offset, response.items);
  }

  onMissing = (missing) => {
    const first = missing[0];
    const last = missing[missing.length - 1];

    let offset = first - (first % PAGE_LEN);
    const offsets = [];
    while (offset < last) {
      offsets.push(offset);
      offset += PAGE_LEN;
    }

    offsets.forEach(offset => this.fetch(offset));
  }

  render() {
    const {render, stash} = this.props;

    return <ViewportDetector
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
