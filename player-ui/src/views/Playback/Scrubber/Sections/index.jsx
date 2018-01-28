import React, { Component } from 'react';

export class Sections extends Component {
  render() {
    if (this.props.sections) {
      this.sections = this.props.sections;
    }

    const sections = this.sections || [];

    const total = sections.reduce((time, section) => {
      return time + section.duration;
    }, 0);

    const classes = ['Sections'];
    if (this.props.sections) {
      classes.push('ready');
    }

    return (
      <div className={classes.join(' ')}>
        {sections.map(section => {
          const fr = section.duration / total;
          return (
            <div
              key={section.start}
              className="section"
              style={{ width: `${fr * 100}%` }}
            />
          );
        })}
      </div>
    );
  }
}
