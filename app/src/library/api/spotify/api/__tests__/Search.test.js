import {SearchAPI} from '../Search.js';

describe('SearchAPI', () => {
    describe('#search()', () => {
        it('queries search endpoint', () => {
            const FAKE = Symbol();
            const api = new SearchAPI();
            api.request = jest.fn().mockReturnValue(FAKE);
            expect(api.search('track', 'john mc bain')).toBe(FAKE);
            expect(api.request.mock.calls.length).toBe(1);
            expect(api.request).toBeCalledWith(
                'https://api.spotify.com/v1/search?type=track&limit=50&q=john%20mc%20bain');
        });
    })
});
