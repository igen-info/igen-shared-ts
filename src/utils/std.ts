import type { AnyFunction, Complete, Optional, Result } from '../types.js';

export const isDefined = <T>(value: Optional<T>): value is Complete<T> => value !== undefined && value !== null;

export const assertDefined = <T>(value: Optional<T>, message?: string): Complete<T> => {
    if (!isDefined(value)) {
        throw new Error(message ?? 'Value is undefined or null');
    }
    return value;
};

export const identity = <T>(value: T): T => value;

export const noop = (): void => {};

export const not = (fn: AnyFunction<boolean>): AnyFunction<boolean> => {
    return (...args) => !fn(...args);
};

export const isString = (value: unknown): value is string => typeof value === 'string';

export const isNumber = (value: unknown): value is number => typeof value === 'number';

export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';

export const isSymbol = (value: unknown): value is symbol => typeof value === 'symbol';

export const isFunction = (value: unknown): value is AnyFunction => typeof value === 'function';

export const isDate = (value: unknown): value is Date => value instanceof Date;

export const isRegExp = (value: unknown): value is RegExp => value instanceof RegExp;

export const isPromise = (value: unknown): value is Promise<unknown> => value instanceof Promise;

export const isObject = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;

export const isArray = (value: unknown): value is unknown[] => Array.isArray(value);

export const isSafeNumber = (value: unknown): value is number => typeof value === 'number' && isFinite(value);

export const isEmptyObject = (value: unknown): value is Record<string, never> => isObject(value) && Object.keys(value).length === 0;

export const isPlainObject = (value: unknown): value is Record<string, unknown> => {
    if (!isObject(value)) {
        return false;
    }

    const proto = Reflect.getPrototypeOf(value);
    return proto === null || proto === Object.prototype;
};

export const ok = <T>(value: T): Result<T, never> => ({ ok: true, value });

export const err = <E>(error: E): Result<never, E> => ({ ok: false, error });
