export function withPlayingTrack(state) {
    const track = state.player.currentTrack;
    const trackId = track && track.get('id');
    return {
        track,
        analysis: state.track.analysis.get(trackId),
        features: state.track.feature.get(trackId),
        context: state.player.context,
    };
}
