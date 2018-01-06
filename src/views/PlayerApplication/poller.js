export function createPoller(player, onState) {
  let pollTimer;
  let lastTimestamp = 0;

  async function poll() {
    const state = await player.getCurrentState();

    if (state) {
      if (state.timestamp > lastTimestamp) {
        onState(state);
      }
      lastTimestamp = state.timestamp;
    }

    pollTimer = setTimeout(poll, 1000);
  }

  function destroy() {
    clearTimeout(pollTimer);
  }

  poll();

  return {
    destroy,
  };
}
