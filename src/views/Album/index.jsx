import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ViewHeader } from 'components/ViewHeader';
import { TrackList } from 'fragments/TrackList';
import { Track } from 'fragments/Track';

import { fetchAlbum, playAlbum } from 'store';

import './AlbumDetail.css';

export class AlbumDetail extends Component {
  componentWillMount() {
    this.props.fetchAlbum(this.props.albumId);
  }

  playTrack = track => {
    const { playAlbum, albumId } = this.props;
    playAlbum(albumId, track.get('id'));
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
    playAlbum,
  }
)(AlbumDetail);
