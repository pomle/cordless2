export function createPoller(player, onState) {
  let pollTimer;
  let lastTimestamp = 0;

  function emit(state) {
    if (state) {
      if (state.timestamp > lastTimestamp) {
        onState(state);
      }
      lastTimestamp = state.timestamp;
    }

    pollTimer = setTimeout(poll, 1000);
  }

  function poll() {
    player.getCurrentState().then(emit);
  }

  function destroy() {
    clearTimeout(pollTimer);
  }

  poll();

  return {
    destroy,
  };
}
