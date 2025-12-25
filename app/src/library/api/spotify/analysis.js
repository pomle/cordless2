const EventEmitter = require('eventemitter3');

function getAtTime(set, time) {
    for (let i = 0; i < set.length; i++) {
        if (time < set[i].start) {
            return set[i - 1];
        }
    }
}

export class AnalysisResolver {
  constructor(analysis) {
    this.analysis = analysis;
  }

  resolve(atTime) {
    console.log(this.analysis);
    return {
        bar: getAtTime(this.analysis.bars, atTime),
        beat: getAtTime(this.analysis.beats, atTime),
        section: getAtTime(this.analysis.sections, atTime),
        segment: getAtTime(this.analysis.segments, atTime),
        tatum: getAtTime(this.analysis.tatums, atTime),
    };
  }
}

export class AnalysisStream extends EventEmitter {
  constructor(analyzer) {
    super();

    this.analyzer = analyzer;
    this.frameId = null;

    this.offsetTime = null;
    this.lastTime = 0;

    this.onFrame = this.onFrame.bind(this);
  }

  run(state) {
    if (state) {
      this.start();
    } else {
      this.stop();
    }
  }

  sync(songPositionMs) {
      this.offsetTime = this.lastTime - songPositionMs;
  }

  onFrame(time) {
    if (!this.offsetTime) {
        this.offsetTime = time;
    }

    this.lastTime = time;

    const songPositionMs = time - this.offsetTime;
    const data = this.analyzer.resolve(songPositionMs / 1000);

    this.emit('data', Object.assign({
      position: songPositionMs / 1000,
    }, data));

    this.frameId = window.requestAnimationFrame(this.onFrame);
  }

  start() {
      if (this.frameId === null) {
          this.frameId = window.requestAnimationFrame(this.onFrame);
      }
  }

  stop() {
    window.cancelAnimationFrame(this.frameId);
    this.frameId = null;
  }
}

export function stream(fett) {
    return new AnalysisStream(new AnalysisResolver(fett));
}
