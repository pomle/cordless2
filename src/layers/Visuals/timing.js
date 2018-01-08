export function timer(callback) {
  let frameId, lastTime;

  function update(time) {
    if (time && lastTime) {
      const diff = time - lastTime;
      callback(diff, time)
    }
    lastTime = time;
    frameId = window.requestAnimationFrame(update);
  }

  update();

  function stop() {
    window.cancelAnimationFrame(frameId);
  }

  return {
    stop
  }
}
