import ms from 'ms';

export function sleep<T>(duration: number | string, value?: T): Promise<T> {
    let durationInMilliseconds: number;

    if (typeof duration === 'number') {
        if (
            !isFinite(duration) ||
            Math.floor(duration) !== duration ||
            duration < 0
        ) {
            return Promise.reject('Duration must be a non-negative integer.');
        }

        durationInMilliseconds = duration;
    } else if (typeof duration === 'string') {
        try {
            durationInMilliseconds = ms(duration);
            if (
                typeof durationInMilliseconds === 'undefined' ||
                durationInMilliseconds < 0
            ) {
                return Promise.reject('Invalid duration string.');
            }
        } catch (error) {
            return Promise.reject('Invalid duration string.');
        }
    } else {
        return Promise.reject('Duration must be a valid number or string.');
    }

    return new Promise((resolve): any =>
        setTimeout(() => {
            resolve(value);
        }, durationInMilliseconds)
    );
}
