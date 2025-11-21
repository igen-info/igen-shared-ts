export const clone = <T>(object: T, props: Partial<T>): T => ({ ...object, ...props }) as T;

export const isShallowEqual = <T extends Record<PropertyKey, unknown>>(a: T, b: T): boolean => {
    const keysA = Object.keys(a) as Array<keyof T>;
    const keysB = Object.keys(b) as Array<keyof T>;

    if (keysA.length !== keysB.length) {
        return false;
    }

    return keysA.every((key) => Object.prototype.hasOwnProperty.call(b, key) && a[key] === b[key]);
};

export const pick = <T extends Record<PropertyKey, unknown>, K extends keyof T>(object: T, keys: readonly K[]): Pick<T, K> => {
    return keys.reduce(
        (acc, key) => {
            if (Object.prototype.hasOwnProperty.call(object, key)) {
                acc[key] = object[key];
            }
            return acc;
        },
        {} as Pick<T, K>,
    );
};

export const omit = <T extends Record<PropertyKey, unknown>, K extends keyof T>(object: T, keys: readonly K[]): Omit<T, K> => {
    const omitSet = new Set<PropertyKey>(keys);
    return (Object.keys(object) as Array<keyof T>).reduce((acc, key) => {
        if (!omitSet.has(key)) {
            acc[key] = object[key];
        }
        return acc;
    }, {} as Partial<T>) as Omit<T, K>;
};

export const entriesToObject = <T>(entries: Array<[PropertyKey, T]>): Record<PropertyKey, T> => {
    return entries.reduce<Record<PropertyKey, T>>((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});
};
