import {sleep} from './index';

beforeEach(() => {
    jest.resetModules();
});

test('good durations', async () => {
    await sleep(1);
    await sleep(0);
    await sleep('0');
    await sleep('1');
    await sleep('1ms');
});

test('bad durations', async () => {
    const badValues: any[] = [
        -23,
        '-200',
        'unami',
        null,
        undefined,
        {foo: 'bar'},
        {}
    ];

    for (const value of badValues) {
        await expect(sleep(value)).rejects.toMatch('');
    }
});

/* This shouldn't happen because we only call ms if the argument is a string,
   and ms returns undefined rather than throwing if it's a bad string. But
   let's make sure we handle the error correctly if it does happen. */
test('ms throwing an error', async () => {
    jest.doMock('ms', () => {
        return jest.fn(() => {
            throw new Error(`I can't do that.`);
        });
    });

    // Re-import to pick up the mock
    const {sleep} = await import('./index');

    await expect(sleep('1s')).rejects.toMatch('Invalid');
});

test('the passage of time', async () => {
    jest.useFakeTimers();

    const mock = jest.fn();
    const promise = sleep(1000).then(() => {
        mock();
    });

    // awaiting seems to make the Promise resolve when it should:
    // https://github.com/facebook/jest/issues/2157
    await jest.advanceTimersByTime(999);
    expect(mock).not.toHaveBeenCalled();
    await jest.advanceTimersByTime(1);
    expect(mock).toHaveBeenCalled();
});
