import {CoreAPI, encode} from '../Core.js';

describe('CoreAPI', () => {
    describe('escape()', () => {
        it('url encodes template string parts', () => {
            const name = 'Mr. Dooble-Dingus & C:o';
            const url = encode`/user/${name}/profile`;
            expect(url).toBe('/user/Mr.%20Dooble-Dingus%20%26%20C%3Ao/profile');
        });
    });

    describe('#url()', () => {
        it('concatenates input with base URL', () => {
            const api = new CoreAPI();
            expect(api.url('my/test')).toBe('https://api.spotify.com/my/test');
        });

        it('supports query params from array', () => {
            const api = new CoreAPI();
            const params = [
                ['name', 'john'],
                ['with space', 'spe&ci?al'],
            ];
            expect(api.url('my/test', params))
                .toEqual('https://api.spotify.com/my/test?name=john&with%20space=spe%26ci%3Fal');
        });

        it('supports query params from object', () => {
            const api = new CoreAPI();
            const params = {name: 'john', 'with space': 'spe&ci?al'};
            expect(api.url('my/test', params))
                .toEqual('https://api.spotify.com/my/test?name=john&with%20space=spe%26ci%3Fal');
        });
    })
});
