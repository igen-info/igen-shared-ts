/**
 * Restricts a number to stay within the inclusive [min, max] range.
 */
export const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

/**
 * Rounds a number to the requested decimal precision.
 */
export const roundTo = (value: number, precision = 0): number => {
    const factor = 10 ** precision;
    return Math.round(value * factor) / factor;
};

/**
 * Adds together every value in the provided list.
 */
export const sum = (values: number[]): number => values.reduce((total, current) => total + current, 0);

/**
 * Calculates the arithmetic mean of all numbers.
 * @throws Error when the list is empty.
 */
export const mean = (values: number[]): number => {
    if (values.length === 0) {
        throw new Error('Cannot compute mean of an empty array');
    }
    return sum(values) / values.length;
};

/**
 * Converts a ratio to a percentage string with the given precision.
 */
export const toPercentage = (value: number, digits = 2): string => `${(value * 100).toFixed(digits)}%`;

/**
 * Formats a number using Intl.NumberFormat with the provided options.
 */
export const formatNumber = (value: number, locales?: Intl.LocalesArgument, options?: Intl.NumberFormatOptions): string => {
    return new Intl.NumberFormat(locales, options).format(value);
};
