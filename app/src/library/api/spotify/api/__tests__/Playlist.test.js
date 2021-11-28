import {PlaylistAPI} from '../Playlist.js';

describe('PlaylistAPI', () => {
    const FAKE_RESULT = Symbol();

    describe('#addTracks()', () => {
        it('creates a payload without position if omitted', () => {
            const api = new PlaylistAPI();
            api.request = jest.fn().mockReturnValue(FAKE_RESULT);
            expect(api.addTracks('pomle', '29851vj901jf2ck', ['k1fj24fj1241', '1209c1-2k', '192ki-01v2rv'])).toBe(FAKE_RESULT);
            expect(api.request.mock.calls.length).toBe(1);
            expect(api.request).toBeCalledWith(
                'https://api.spotify.com/v1/users/pomle/playlists/29851vj901jf2ck/tracks',
                {"uris": ["spotify:track:k1fj24fj1241", "spotify:track:1209c1-2k", "spotify:track:192ki-01v2rv"]},
                'POST');
        });

        it('creates a payload with position if given', () => {
            const api = new PlaylistAPI();
            api.request = jest.fn().mockReturnValue(FAKE_RESULT);
            expect(api.addTracks('pomle', '29851vj901jf2ck', ['k1fj24fj1241', '1209c1-2k', '192ki-01v2rv'], 10)).toBe(FAKE_RESULT);
            expect(api.request.mock.calls.length).toBe(1);
            expect(api.request).toBeCalledWith(
                'https://api.spotify.com/v1/users/pomle/playlists/29851vj901jf2ck/tracks',
                {"position": 10, "uris": ["spotify:track:k1fj24fj1241", "spotify:track:1209c1-2k", "spotify:track:192ki-01v2rv"]},
                'POST');
        });
    });

    describe('#removeTrack()', () => {
        it('creates a compatible payload', () => {
            const api = new PlaylistAPI();
            api.request = jest.fn().mockReturnValue(FAKE_RESULT);
            expect(api.removeTrack('pomle', '29851vj901jf2ck', '12r1c02', 'k1fj24fj1241', 2)).toBe(FAKE_RESULT);
            expect(api.request.mock.calls.length).toBe(1);
            expect(api.request).toBeCalledWith(
                'https://api.spotify.com/v1/users/pomle/playlists/29851vj901jf2ck/tracks',
                {"snapshot_id": "12r1c02", "tracks": [{"positions": [2], "uri": "spotify:track:k1fj24fj1241"}]},
                'DELETE');
        });
    });

    describe('#getMyPlaylists', () => {
        it('queries logged in users playlists', () => {
            const api = new PlaylistAPI();
            api.request = jest.fn().mockReturnValue(FAKE_RESULT);
            expect(api.getMyPlaylists()).toBe(FAKE_RESULT);
            expect(api.request.mock.calls.length).toBe(1);
            expect(api.request).toBeCalledWith(
                'https://api.spotify.com/v1/me/playlists');
        });
    });

    describe('#getPlaylists()', () => {
        it('queries specific playlists for given userId', () => {
            const api = new PlaylistAPI();
            api.request = jest.fn().mockReturnValue(FAKE_RESULT);
            expect(api.getPlaylists('pomle')).toBe(FAKE_RESULT);
            expect(api.request.mock.calls.length).toBe(1);
            expect(api.request).toBeCalledWith(
                'https://api.spotify.com/v1/users/pomle/playlists');
        });
    });

    describe('#getPlaylist()', () => {
        it('queries playlist endpoint', () => {
            const api = new PlaylistAPI();
            api.request = jest.fn().mockReturnValue(FAKE_RESULT);
            expect(api.getPlaylist('pomle', '8a0gynawa9g8wa')).toBe(FAKE_RESULT);
            expect(api.request.mock.calls.length).toBe(1);
            expect(api.request).toBeCalledWith(
                'https://api.spotify.com/v1/users/pomle/playlists/8a0gynawa9g8wa');
        });

        it('supports market', () => {
            const api = new PlaylistAPI();
            api.request = jest.fn().mockReturnValue(FAKE_RESULT);
            expect(api.getPlaylist('pomle', '8a0gynawa9g8wa', {market: 'es'})).toBe(FAKE_RESULT);
            expect(api.request.mock.calls.length).toBe(1);
            expect(api.request).toBeCalledWith(
                'https://api.spotify.com/v1/users/pomle/playlists/8a0gynawa9g8wa?market=es');
        });

        it('supports fields', () => {
            const api = new PlaylistAPI();
            api.request = jest.fn().mockReturnValue(FAKE_RESULT);
            expect(api.getPlaylist('pomle', '8a0gynawa9g8wa', {fields: '(!tracks)'})).toBe(FAKE_RESULT);
            expect(api.request.mock.calls.length).toBe(1);
            expect(api.request).toBeCalledWith(
                'https://api.spotify.com/v1/users/pomle/playlists/8a0gynawa9g8wa?fields=(!tracks)');
        });
    })

    describe('#getPlaylistTracks()', () => {
        it('queries tracks for a given playlist', () => {
            const api = new PlaylistAPI();
            api.request = jest.fn().mockReturnValue(FAKE_RESULT);
            expect(api.getPlaylistTracks('pomle', '29851vj901jf2ck')).toBe(FAKE_RESULT);
            expect(api.request.mock.calls.length).toBe(1);
            expect(api.request).toBeCalledWith(
                'https://api.spotify.com/v1/users/pomle/playlists/29851vj901jf2ck/tracks');
        });
    });
});
