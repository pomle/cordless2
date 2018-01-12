import React, { Component } from 'react';

import { compareObjectURIs, onChange } from './util.js';
import { analysis } from '@pomle/spotify-web-sdk';

import { Album } from './Album';
import { Backdrop } from './Backdrop';

import './Visuals.css';

export class Visuals extends Component {
  constructor(props) {
    super(props);

    this.onAlbumChange = onChange(compareObjectURIs, this.onAlbumChange);
    this.onTrackChange = onChange(compareObjectURIs, this.onTrackChange);

    this.state = {
      track: null,
      album: null,
      pulse: 0.3,
      loudness: 0,
    };
  }

  componentWillReceiveProps({ context, track }) {
    this.onTrackChange(track);

    if (this.analyzer) {
      this.analyzer.run(!context.paused);
      this.analyzer.sync(context.position);
    }
  }

  onAlbumChange = album => {
    this.setState({ album });
  };

  onTrackChange = async track => {
    this.setState({ track });

    this.onAlbumChange(track.album);

    if (this.analyzer) {
      this.analyzer.stop();
      this.analyzer = null;
    }

    function lookAt(prop, callback) {
      let last = {};

      return function onData(data) {
        if (data) {
          if (last[prop] !== data[prop]) {
            callback(data);
          }
          last = data;
        }
      };
    }

    const lookAtSegment = lookAt('loudness_max', data =>
      console.log('Segment', data.loudness_max)
    );
    const lookAtSection = lookAt('start', data => console.log('Section', data));

    const lookAtLoudness = lookAt('loudness', data => {
      const loudness = 1 - -data.loudness / 30;
      const loudnessQuad = Math.pow(loudness, 2);
      console.log('Updating loudness', loudnessQuad);
      this.setState({ loudness: loudnessQuad });
    });

    const data = await this.props.trackAPI.getAudioAnalysis(track.id);
    this.analyzer = analysis.stream(data);
    this.analyzer.on('data', data => {
      if (data.beat) {
        const beatPosition = data.position - data.beat.start;
        const beatProgress = beatPosition / data.beat.duration;
        //console.log(beatProgress, 1 - beatProgress);

        this.setState({
          pulse: 1 - beatProgress,
        });
        //console.log(data.position.toFixed(2), '-'.repeat((data.position - data.beat.start) * 10));
        //console.log(data.position - data.beat.start, data.beat.start, data.beat.duration);
      }

      if (data.section) {
        lookAtLoudness(data.section);
      }

      if (data.segment) {
        this.setState({
          loudness: data.segment.loudness_max,
        });
      }

      lookAtSegment(data.segment);
      lookAtSection(data.section);
      //console.log(data.segment);
    });
    this.analyzer.start();
  };

  render() {
    //console.log('Visual props', this.props);
    const { promote } = this.props;
    const { album, pulse, loudness } = this.state;
    const image = album && album.images[0].url;
    return (
      <div className="Visuals" ref={node => (this.element = node)}>
        <Album image={image} promote={promote}/>

        <Backdrop image={image} pulse={pulse} promote={promote} loudness={loudness}/>
      </div>
    );
  }
}
