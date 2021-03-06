import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'immutable';

import './PlaylistAdapter.css';

class PlaylistAdapter extends PureComponent {
  static contextTypes = {
    viewport: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      tracks: [],
      inView: new Set(),
    };
  }

  componentDidMount() {
    this.fetchSlice(0, 100);
    console.log(this.element);
    //window.addEventListener('resize', this.onScroll);
    setInterval(this.pollScroll, 200);
  }

  pollScroll = () => {
    if (this.context.viewport) {
      const start = this.context.viewport.scrollTop;
      console.log(start);
      const end = start + this.context.viewport.offsetHeight;
      this.checkInViewItems(start, end);
    }
  };

  checkInViewItems(startX, endX) {
    const inView = new Set();
    let index = 0;
    for (const child of this.items.children) {
      const childStart = child.offsetTop;
      const childEnd = childStart + child.offsetHeight;
      if (childStart < endX && childEnd > startX) {
        inView.add(index);
      }
      index++;
    }

    this.setState({inView});
  }

  fetchSlice(offset, limit) {
    this.props.playlistAPI.getPlaylistTracks('pomle', '21NWVcrVBT6MHAS1jcdoW3', {offset, limit})
    .then(data => {
      this.updateWithData(data);
    });
  }

  updateWithData(data) {
    this.setState(prev => {
      const next = {};
      if (prev.tracks.length !== data.total) {
        next.tracks = new Array(data.total).fill(undefined);
      } else {
        next.tracks = [...prev.tracks];
      }

      next.tracks.splice(data.offset, data.limit, ...data.items);

      return next;
    });
  }

  render() {
    const {tracks, inView} = this.state;

    return <div className="playlist-adapter-tracks" ref={node => this.items = node}>
      { tracks.map((track, index) => {
        return <div key={index} className="track">
          {inView.has(index) ? 'Yes' : 'No'}
        </div>;
      })}
    </div>;
  }
}

export default PlaylistAdapter;
