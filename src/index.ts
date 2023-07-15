function rndw<T>(items: T[], callback: (item: T) => number): T | void {
    if (!Array.isArray(items)) {
        throw new TypeError('Items is not array!');
    }
    if (!(callback && callback instanceof Function)) {
        throw new TypeError('callback is not a function!');
    }
    let total = 0;
    for (let i = 0; i < items.length; i++) {
        let w = callback(items[i]);
        if (typeof w !== 'number') {
            throw new TypeError('callback does not produce number')
        }
        total += w
    }
    let r = Math.random() * total;
    for (let i = 0; i < items.length; i++) {
        total -= callback(items[i]);
        if (total <= r) {
            return items[i];
        }
    }
    console.warn('random weight fallback to the last item')
    return items[items.length - 1]
}
export default rndw