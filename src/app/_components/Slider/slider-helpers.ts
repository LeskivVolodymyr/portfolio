function getFromEnd<T>(count: number, collection: T[]): T[] {
    if (collection.length === 0 || count <= 0) return [];

    const result: T[] = [];
    const start = collection.length - count;

    for (let i = start; i < collection.length; i++) {
        const idx = ((i % collection.length) + collection.length) % collection.length;
        result.push(collection[idx]);
    }

    return result;
}

function getFromStart<T>(count: number, collection: T[]): T[] {
    if (collection.length === 0 || count <= 0) return [];

    const result: T[] = [];
    for (let i = 0; i < count; i++) {
        const idx = ((i % collection.length) + collection.length) % collection.length;
        result.push(collection[idx]);
    }
    return result;
}

export { getFromEnd, getFromStart };