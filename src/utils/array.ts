import type { Optional } from '../types.js';
import { isDefined } from './std.js';

/**
 * Returns a new array containing only the first occurrence of each item in insertion order.
 */
export const unique = <T>(array: T[]): T[] => Array.from(new Set(array));

/**
 * Checks if an array exists and has no elements.
 */
export const isEmpty = <T>(array: Optional<T[]>): boolean => isDefined(array) && array.length === 0;

/**
 * Creates a new array without every occurrence of the provided value.
 */
export const without = <T>(array: T[], value: T): T[] => array.filter((item) => item !== value);

/**
 * Creates a new array filtering out every value present in the provided list.
 */
export const withoutAll = <T>(array: T[], values: T[]): T[] => array.filter((item) => !values.includes(item));

/**
 * Returns the elements shared between both arrays.
 */
export const intersection = <T>(a: T[], b: T[]): T[] => a.filter((item) => b.includes(item));

/**
 * Returns the elements that are present in the first array but not the second.
 */
export const difference = <T>(a: T[], b: T[]): T[] => a.filter((item) => !b.includes(item));

/**
 * Splits an array into equally sized chunks.
 * @throws Error when size is not greater than zero.
 */
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

/**
 * Groups items by a derived key produced by `keyFn`.
 */
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

/**
 * Splits an array in two lists according to predicate truthiness.
 * @returns A tuple with items passing the predicate and the remaining items.
 */
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

/**
 * Combines two arrays into a list of tuples with matching indexes.
 */
export const zip = <A, B>(a: A[], b: B[]): Array<[A, B]> => {
    const length = Math.min(a.length, b.length);
    const result: Array<[A, B]> = [];

    for (let i = 0; i < length; i += 1) {
        result.push([a[i]!, b[i]!]);
    }
    return result;
};
