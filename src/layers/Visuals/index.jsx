import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router'

import { compareObjectURIs, onChange, lookAt } from './util.js';
import { analysis } from '@pomle/spotify-web-sdk';

import { Album } from './Album';
import { Backdrop } from './Backdrop';

import './Visuals.css';

export const Visuals = withRouter(class extends Component {
  static contextTypes = {
    api: PropTypes.object,
  };

  constructor(props, context) {
    super(props);

    this.trackAPI = context.api.trackAPI;

    this.onAlbumChange = onChange(
      compareObjectURIs,
      this.onAlbumChange.bind(this)
    );
    this.onTrackChange = onChange(
      compareObjectURIs,
      this.onTrackChange.bind(this)
    );

    this.state = {
      track: null,
      album: null,
      features: null,
      pulse: 0.3,
    };
  }

  componentWillReceiveProps({ context, track }) {
    this.onTrackChange(track);

    if (this.analyzer) {
      this.analyzer.run(!context.paused);
      this.analyzer.sync(context.position);
    }
  }

  onAlbumChange(album) {
    this.setState({ album });
  }

  onTrackChange(track) {
    this.setState({ track });

    this.onAlbumChange(track.album);

    this.updateAnalyser(track.id);
    this.updateFeatures(track.id);
  }

  async updateFeatures(trackId) {
    const features = await this.trackAPI.getAudioFeatures(trackId);
    this.setState({ features });
  }

  async updateAnalyser(trackId) {
    if (this.analyzer) {
      this.analyzer.stop();
      this.analyzer = null;
    }

    const lookAtSegment = lookAt('loudness_max', data =>
      console.log('Segment', data.loudness_max)
    );
    const lookAtSection = lookAt('start', data => console.log('Section', data));

    const data = await this.trackAPI.getAudioAnalysis(trackId);
    this.analyzer = analysis.stream(data);
    this.analyzer.on('data', data => {
      if (data.beat) {
        const beatPosition = data.position - data.beat.start;
        const beatProgress = beatPosition / data.beat.duration;

        this.setState({
          pulse: 1 - beatProgress,
        });
      }

      lookAtSegment(data.segment);
      lookAtSection(data.section);
    });
    this.analyzer.start();
  }

  render() {
    const { location } = this.props;
    const promote = location.pathname === '/now-playing';

    const { album, pulse } = this.state;
    const image = album && album.images[0].url;
    return (
      <div className="Visuals">
        <Album album={album} promote={promote} />

        <Backdrop image={image} pulse={pulse} promote={promote} />
      </div>
    );
  }
});
