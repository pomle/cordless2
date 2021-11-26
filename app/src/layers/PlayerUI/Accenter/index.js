import React, { Component } from "react";
import { connect } from "react-redux";

function getColor(color) {
  if (color) {
    if (color.vibrant) {
      return `rgb(${color.vibrant.rgb.join(",")})`;
    }

    if (color.lightvibrant) {
      return `rgb(${color.lightvibrant.rgb.join(",")})`;
    }
  }

  return undefined;
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
            `,
          }}
        />
      );
    }
  }
);
