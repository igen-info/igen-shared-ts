export const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

export const roundTo = (value: number, precision = 0): number => {
    const factor = 10 ** precision;
    return Math.round(value * factor) / factor;
};

export const sum = (values: number[]): number => values.reduce((total, current) => total + current, 0);

export const mean = (values: number[]): number => {
    if (values.length === 0) {
        throw new Error('Cannot compute mean of an empty array');
    }
    return sum(values) / values.length;
};

export const toPercentage = (value: number, digits = 2): string => `${(value * 100).toFixed(digits)}%`;

export const formatNumber = (value: number, locales?: Intl.LocalesArgument, options?: Intl.NumberFormatOptions): string => {
    return new Intl.NumberFormat(locales, options).format(value);
};
