import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { analysis } from '@pomle/spotify-web-sdk';
import { connect, withPlayingTrack } from '@pomle/spotify-react';

import { lookAt } from './util.js';
import { largest } from 'library/image';
import { compareObjectURIs, onChange, is } from 'library/compare';

import { Album } from './Album';
import { Backdrop } from './Backdrop';

import './Visuals.css';

export const Visuals = withRouter(connect([withPlayingTrack])(class extends Component {
  static contextTypes = {
    images: PropTypes.object,
  };

  constructor(props, context) {
    super(props);

    this.onAlbumChange = onChange(
      compareObjectURIs,
      this.onAlbumChange.bind(this)
    );
    this.onTrackChange = onChange(
      compareObjectURIs,
      this.onTrackChange.bind(this)
    );

    this.state = {
      artwork: null,
      track: null,
      pulse: 0.3,
    };

    this.updateAnalyser = onChange(is, this.updateAnalyser.bind(this));
  }

  componentWillReceiveProps({ context, track, analysis, trackAPI }) {
    this.onTrackChange(track);

    if (this.analyzer) {
      this.analyzer.run(!context.paused);
      this.analyzer.sync(context.position);
    }

    this.updateAnalyser(analysis);
  }

  onAlbumChange(album) {
    this.setState({ album });

    this.context.images
      .get(largest(album.get('images')).url)
      .then(artwork => this.setState({ artwork }));
  }

  onTrackChange(track) {
    this.setState({ track });

    this.onAlbumChange(track.get('album'));
  }

  updateAnalyser(data) {
    console.log('updateAnalyser', data);

    if (this.analyzer) {
      this.analyzer.stop();
      this.analyzer = null;
    }

    const lookAtSegment = lookAt('loudness_max', data =>
      console.log('Segment', data.loudness_max)
    );
    const lookAtSection = lookAt('start', data =>
      console.log('Section', data)
    );

    this.analyzer = analysis.stream(data);
    this.analyzer.on('data', data => {
      if (data.beat) {
        const beatPosition = data.position - data.beat.start;
        const beatProgress = beatPosition / data.beat.duration;

        this.setState({
          beat: beatProgress,
          pulse: 1 - beatProgress,
        });
      }

      if (data.bar) {
        const barPosition = data.position - data.bar.start;
        const barProgress = barPosition / data.bar.duration;

        this.setState({
          bar: barProgress,
        });
      }

      lookAtSegment(data.segment);
      lookAtSection(data.section);
    });
    this.analyzer.start();
  }

  render() {
    const { location } = this.props;
    const { artwork, pulse } = this.state;
    const promote = location.pathname === '/now-playing';

    return (
      <div className="Visuals">
        <Album artwork={artwork} promote={promote} />

        <Backdrop artwork={artwork} pulse={pulse} promote={promote} />
      </div>
    );
  }
}));
