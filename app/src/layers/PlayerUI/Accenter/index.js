import React, { Component } from "react";
import { connect } from "react-redux";

function getColor(color) {
  if (color) {
    if (color.vibrant) {
      return toCSS(color.vibrant.rgb, 1);
    }

    if (color.lightvibrant) {
      return toCSS(color.lightvibrant.rgb, 1);
    }
  }

  return undefined;
}

function getMutedColor(color) {
  if (color) {
    if (color.darkvibrant) {
      return toCSS(
        color.darkvibrant.rgb.map((v) => v * 0.2),
        0.9
      );
    }

    if (color.muted) {
      return toCSS(
        color.muted.rgb.map((v) => v * 0.1),
        0.9
      );
    }

    if (color.darkmuted) {
      return toCSS(
        color.darkmuted.rgb.map((v) => v * 0.2),
        0.9
      );
    }
  }

  return undefined;
}

function toCSS(rgb, alpha = 1) {
  return `rgb(${rgb.join(",")}, ${alpha})`;
}

export const Accenter = connect((state) => {
  const albumId = state.player
    .getIn(["context", "track_window", "current_track", "album", "uri"], "")
    .split(":")[2];
  return {
    color: state.color.getIn(["album", albumId]),
  };
})(
  class Accenter extends Component {
    render() {
      const accentColor = getColor(this.props.color);
      const backgroundColor = getMutedColor(this.props.color);
      console.log(this.props.color);

      return (
        <style
          dangerouslySetInnerHTML={{
            __html: `
                a {
                    ${accentColor ? `color: ${accentColor};` : ""}
                }

                input {
                    ${accentColor ? `border-color: ${accentColor};` : ""}
                }

                .ProgressBar .progress {
                    ${accentColor ? `background-color: ${accentColor};` : ""}
                }

                .PlayerWindow .Playback {
                    ${
                      backgroundColor
                        ? `background-color: ${backgroundColor};`
                        : ""
                    }
                }
            `,
          }}
        />
      );
    }
  }
);
