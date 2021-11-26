import React, { Component } from "react";
import VirtualWindow from "components/VirtualWindow";

const PAGE_LEN = 50;

class CollectionVirtualizer extends Component {
  componentDidMount() {
    this.onProps(this.props);
  }

  componentDidUpdate() {
    this.onProps(this.props);
  }

  onProps() {
    this.fetch(0);
  }

  fetch(offset = 0) {
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
  };

  onPlaceholder = () => {
    return this.props.placeholder;
  };

  render() {
    const { render, collection } = this.props;

    return collection.total !== null ? (
      <VirtualWindow
        resultSize={collection.total}
        items={collection.items}
        onMissing={this.onMissing}
        onPlaceholder={this.onPlaceholder}
        onDraw={render}
      />
    ) : null;
  }
}

export default CollectionVirtualizer;
