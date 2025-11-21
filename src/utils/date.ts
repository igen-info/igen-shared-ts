/**
 * Units supported by the date helpers for shifting, diffing and rounding.
 */
export type DateUnit = 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';

const MILLISECOND_IN_SECOND = 1000;
const MILLISECOND_IN_MINUTE = MILLISECOND_IN_SECOND * 60;
const MILLISECOND_IN_HOUR = MILLISECOND_IN_MINUTE * 60;
const MILLISECOND_IN_DAY = MILLISECOND_IN_HOUR * 24;
const MILLISECOND_IN_WEEK = MILLISECOND_IN_DAY * 7;

const cloneDate = (date: Date): Date => new Date(date.getTime());

const assertUnsupportedUnit = (_unit: never): never => {
    void _unit;
    throw new Error('Unsupported DateUnit');
};

const shiftDate = (date: Date, value: number, unit: DateUnit): Date => {
    const updated = cloneDate(date);

    switch (unit) {
        case 'millisecond':
            updated.setMilliseconds(updated.getMilliseconds() + value);
            break;
        case 'second':
            updated.setSeconds(updated.getSeconds() + value);
            break;
        case 'minute':
            updated.setMinutes(updated.getMinutes() + value);
            break;
        case 'hour':
            updated.setHours(updated.getHours() + value);
            break;
        case 'day':
            updated.setDate(updated.getDate() + value);
            break;
        case 'week':
            updated.setDate(updated.getDate() + value * 7);
            break;
        case 'month':
            updated.setMonth(updated.getMonth() + value);
            break;
        case 'year':
            updated.setFullYear(updated.getFullYear() + value);
            break;
        default:
            return assertUnsupportedUnit(unit);
    }

    return updated;
};

const diffInMonths = (start: Date, end: Date): number => {
    if (start.getTime() === end.getTime()) {
        return 0;
    }

    const sign = end > start ? 1 : -1;
    let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const anchor = shiftDate(start, months, 'month');

    if ((sign > 0 && end < anchor) || (sign < 0 && end > anchor)) {
        months -= sign;
    }

    const adjustedAnchor = shiftDate(start, months, 'month');
    const next = shiftDate(adjustedAnchor, sign, 'month');
    const interval = next.getTime() - adjustedAnchor.getTime();

    if (interval === 0) {
        return months;
    }

    return months + ((end.getTime() - adjustedAnchor.getTime()) / interval) * sign;
};

/**
 * Formats a date using the Intl.DateTimeFormat API helpers.
 */
export const formatDate = (date: Date, locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): string => {
    return new Intl.DateTimeFormat(locales, options).format(date);
};

/**
 * Returns a new Date representing the current instant.
 */
export const now = (): Date => new Date();

/**
 * Creates a new date shifted by the provided value and unit.
 * @param date Base date, defaults to `now()`.
 */
export const modifyDate = (value: number, unit: DateUnit, date: Date = now()): Date => shiftDate(date, value, unit);

/**
 * Calculates the difference between two dates in the desired unit.
 */
export const dateDiff = (start: Date, end: Date, unit: DateUnit): number => {
    const diffMilliseconds = end.getTime() - start.getTime();

    switch (unit) {
        case 'millisecond':
            return diffMilliseconds;
        case 'second':
            return diffMilliseconds / MILLISECOND_IN_SECOND;
        case 'minute':
            return diffMilliseconds / MILLISECOND_IN_MINUTE;
        case 'hour':
            return diffMilliseconds / MILLISECOND_IN_HOUR;
        case 'day':
            return diffMilliseconds / MILLISECOND_IN_DAY;
        case 'week':
            return diffMilliseconds / MILLISECOND_IN_WEEK;
        case 'month':
            return diffInMonths(start, end);
        case 'year':
            return diffInMonths(start, end) / 12;
        default:
            return assertUnsupportedUnit(unit);
    }
};

/**
 * Returns a new date pinned to the beginning of the specified unit.
 */
export const startOf = (date: Date, unit: DateUnit): Date => {
    const result = cloneDate(date);

    switch (unit) {
        case 'millisecond':
            return result;
        case 'second':
            result.setMilliseconds(0);
            return result;
        case 'minute':
            result.setSeconds(0, 0);
            return result;
        case 'hour':
            result.setMinutes(0, 0, 0);
            return result;
        case 'day':
            result.setHours(0, 0, 0, 0);
            return result;
        case 'week': {
            const startOfDay = startOf(date, 'day');
            const day = startOfDay.getDay();
            return shiftDate(startOfDay, -day, 'day');
        }
        case 'month':
            result.setDate(1);
            result.setHours(0, 0, 0, 0);
            return result;
        case 'year':
            result.setMonth(0, 1);
            result.setHours(0, 0, 0, 0);
            return result;
        default:
            return assertUnsupportedUnit(unit);
    }
};

/**
 * Returns a new date representing the end instant of a given unit.
 */
export const endOf = (date: Date, unit: DateUnit): Date => {
    if (unit === 'millisecond') {
        return cloneDate(date);
    }

    const nextStart = shiftDate(startOf(date, unit), 1, unit);
    return shiftDate(nextStart, -1, 'millisecond');
};

/**
 * Compares two dates at the provided unit precision.
 */
export const isSame = (a: Date, b: Date, unit: DateUnit): boolean => startOf(a, unit).getTime() === startOf(b, unit).getTime();
