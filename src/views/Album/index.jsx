import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ViewHeader } from 'components/ViewHeader';
import { TrackList } from 'fragments/TrackList';
import { Track } from 'fragments/Track';

import { fetchAlbum } from 'layers/PlayerApplication/store/album';

export class AlbumDetail extends Component {
  static contextTypes = {
    api: PropTypes.object,
  };

  constructor(props, context) {
    super(props);

    this.playbackAPI = context.api.playbackAPI;
  }

  componentWillMount() {
    this.props.fetchAlbum(this.props.albumId);
  }

  playTrack = track => {
    const { albumId } = this.props;
    this.playbackAPI.playAlbum(albumId, track.get('id'));
  };

  updateFilter = filter => {
    this.setState({ filter });
  };

  render() {
    const { album } = this.props;

    if (!album) {
      return null;
    }

    return (
      <div className="AlbumDetail">
        <ViewHeader caption={album.get('name')} images={album.get('images')} />

        <TrackList>
          {album.getIn(['tracks', 'items'], []).map(track => {
            return <Track key={track.get('id')} track={track} play={this.playTrack} />;
          })}
        </TrackList>
      </div>
    );
  }
}

export default connect(
  (state, {albumId}) => {
    return {
      album: state.album.getEntry(albumId),
    };
  },
  {
    fetchAlbum,
  }
)(AlbumDetail);
