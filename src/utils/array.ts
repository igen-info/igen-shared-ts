import type { Optional } from '../types.js';
import { isDefined } from './std.js';

export const unique = <T>(array: T[]): T[] => Array.from(new Set(array));

export const isEmpty = <T>(array: Optional<T[]>): boolean => isDefined(array) && array.length === 0;

export const without = <T>(array: T[], value: T): T[] => array.filter((item) => item !== value);

export const withoutAll = <T>(array: T[], values: T[]): T[] => array.filter((item) => !values.includes(item));

export const intersection = <T>(a: T[], b: T[]): T[] => a.filter((item) => b.includes(item));

export const difference = <T>(a: T[], b: T[]): T[] => a.filter((item) => !b.includes(item));

export const chunk = <T>(array: T[], size: number): T[][] => {
    if (size <= 0) {
        throw new Error('chunk size must be greater than 0');
    }

    const result: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }

    return result;
};

export const groupBy = <T, K extends PropertyKey>(array: T[], keyFn: (value: T) => K): Record<K, T[]> => {
    return array.reduce<Record<K, T[]>>(
        (acc, item) => {
            const key = keyFn(item);
            if (!isDefined(acc[key])) {
                acc[key] = [];
            }
            acc[key].push(item);
            return acc;
        },
        {} as Record<K, T[]>,
    );
};

export const partition = <T>(array: T[], predicate: (value: T) => boolean): [T[], T[]] => {
    const truthy: T[] = [];
    const falsy: T[] = [];

    for (const item of array) {
        if (predicate(item)) {
            truthy.push(item);
        } else {
            falsy.push(item);
        }
    }

    return [truthy, falsy];
};

export const zip = <A, B>(a: A[], b: B[]): Array<[A, B]> => {
    const length = Math.min(a.length, b.length);
    const result: Array<[A, B]> = [];

    for (let i = 0; i < length; i += 1) {
        result.push([a[i]!, b[i]!]);
    }

    return result;
};
