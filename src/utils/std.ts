import type { AnyFunction, Complete, Optional, Result } from '../types.js';

/**
 * Type guard that checks whether a value is neither null nor undefined.
 */
export const isDefined = <T>(value: Optional<T>): value is Complete<T> => value !== undefined && value !== null;

/**
 * Ensures a value is defined, otherwise throws with an optional custom message.
 */
export const assertDefined = <T>(value: Optional<T>, message?: string): Complete<T> => {
    if (!isDefined(value)) {
        throw new Error(message ?? 'Value is undefined or null');
    }
    return value;
};

/**
 * Identity helper that returns the same value received.
 */
export const identity = <T>(value: T): T => value;

/**
 * No-operation function used as a safe default callback.
 */
export const noop = (): void => {};

/**
 * Negates the boolean result of the provided predicate.
 */
export const not = (fn: AnyFunction<boolean>): AnyFunction<boolean> => {
    return (...args) => !fn(...args);
};

/**
 * Narrowing guard that checks if the value is a string.
 */
export const isString = (value: unknown): value is string => typeof value === 'string';

/**
 * Narrowing guard that checks if the value is a number.
 */
export const isNumber = (value: unknown): value is number => typeof value === 'number';

/**
 * Narrowing guard that checks if the value is a boolean.
 */
export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';

/**
 * Narrowing guard that checks if the value is a symbol.
 */
export const isSymbol = (value: unknown): value is symbol => typeof value === 'symbol';

/**
 * Type guard for functions.
 */
export const isFunction = (value: unknown): value is AnyFunction => typeof value === 'function';

/**
 * Type guard for Date instances.
 */
export const isDate = (value: unknown): value is Date => value instanceof Date;

/**
 * Type guard for regular expressions.
 */
export const isRegExp = (value: unknown): value is RegExp => value instanceof RegExp;

/**
 * Type guard for native promises.
 */
export const isPromise = (value: unknown): value is Promise<unknown> => value instanceof Promise;

/**
 * Checks for non-null objects.
 */
export const isObject = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;

/**
 * Type guard for arrays.
 */
export const isArray = (value: unknown): value is unknown[] => Array.isArray(value);

/**
 * Checks whether the value is a finite number.
 */
export const isSafeNumber = (value: unknown): value is number => typeof value === 'number' && isFinite(value);

/**
 * Checks whether the value is a plain object with no own properties.
 */
export const isEmptyObject = (value: unknown): value is Record<string, never> => isObject(value) && Object.keys(value).length === 0;

/**
 * Checks whether the value is an object created by `{}` or `Object.create(null)`.
 */
export const isPlainObject = (value: unknown): value is Record<string, unknown> => {
    if (!isObject(value)) {
        return false;
    }

    const proto = Reflect.getPrototypeOf(value);
    return proto === null || proto === Object.prototype;
};

/**
 * Wraps a successful result in a discriminated union.
 */
export const ok = <T>(value: T): Result<T, never> => ({ ok: true, value });

/**
 * Wraps an error in a discriminated Result union.
 */
export const err = <E>(error: E): Result<never, E> => ({ ok: false, error });
