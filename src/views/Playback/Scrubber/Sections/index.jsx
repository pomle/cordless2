import React, { Component } from 'react';

export class Sections extends Component {
  render() {
    const { sections } = this.props;
    const total = sections.reduce((time, section) => {
      return time + section.duration;
    }, 0);

    return (
      <div className="Sections">
        { sections.map(section => {
          const fr = section.duration / total;
          return <div key={section.start} className="section" style={{width: `${fr * 100}%`}}>

          </div>;
        }) }
      </div>
    );
  }
}
