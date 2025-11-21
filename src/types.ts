export type primitive = string | number | boolean | bigint | symbol | null | undefined;
export type missing = null | undefined;
export type something = Something<primitive | object>;
export type blank = missing | '';

export type AnyObject<K extends PropertyKey = string, V = unknown> = Record<K, V>;
export type AnyFunction<Args extends unknown[] = unknown[], Return = unknown> = (...args: Args) => Return;
export type Optional<T> = T | missing;
export type Something<T> = Exclude<T, missing>;
export type Complete<T> = { [P in keyof T]: Something<T[P]> };
export type Json<T> = { [P in keyof T]: Json<T[P]> | null };
export type Provider<T> = () => T;
export type Consumer<T> = (value: T) => void;
export type Transformer<T, U> = (value: T) => U;
export type Predicate<T> = Transformer<T, boolean>;
export type MaybePromise<T> = T | Promise<T>;
export type MaybeArray<T> = T | T[];

export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type DeepRequired<T> = {
    [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

export type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};

export type ValueOf<T> = T[keyof T];

export type Brand<T, Tag extends string> = T & { readonly __brand: Tag };

export type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };
