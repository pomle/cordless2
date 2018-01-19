import { PlayerState } from '../state';
import context from './fixtures/context.json';

describe('PlayerState', () => {
  it('updates from context and maintains track_window structure', () => {
    let state = new PlayerState();
    state = state.updateContext(context);
    expect(state).toBeInstanceOf(PlayerState);
    expect(state.context.track_window.current_track.id).toBe(
      '1Nk3rKuQwAgVNqT93pFvAd'
    );
  });
});
