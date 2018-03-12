import {sleep} from './index';

test('good durations', async () => {
    await sleep(5);
    await sleep('5');
    await sleep('5ms');
});

test('bad durations', async () => {
    const badValues = [-23, '-200', 'unami', null, undefined, {foo: 'bar'}, {}];

    for (const value of badValues) {
        await expect(sleep(value)).rejects.toMatch('');
    }
});
