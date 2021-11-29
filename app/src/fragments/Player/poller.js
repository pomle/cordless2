export function createPoller(player, onState) {
  let lastTimestamp = 0;

  function emit(state) {
    if (state) {
      if (state.timestamp > lastTimestamp) {
        onState(state);
      }
      lastTimestamp = state.timestamp;
    }
  }

  function poll() {
    player.getCurrentState().then(emit);
  }

  const pollTimer = setInterval(poll, 1000);

  function destroy() {
    clearInterval(pollTimer);
  }

  return {
    destroy,
  };
}
