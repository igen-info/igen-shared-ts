import { afterEach, describe, expect, it, vi } from 'vitest';

import { dateDiff, endOf, formatDate, isSame, modifyDate, now, startOf } from '../src/utils/date.js';

describe('date utilities', () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    it('formatDate delegates to Intl.DateTimeFormat', () => {
        const date = new Date(Date.UTC(2024, 0, 15, 10, 5, 0));
        expect(formatDate(date, 'en-US', { dateStyle: 'medium' })).toBe('Jan 15, 2024');
    });

    it('now reflects the mocked system clock', () => {
        vi.useFakeTimers();
        const fake = new Date('2025-05-01T10:11:12.000Z');
        vi.setSystemTime(fake);
        expect(now().getTime()).toBe(fake.getTime());
    });

    it('modifyDate shifts the date by the provided value and unit', () => {
        const base = new Date('2023-03-10T00:00:00.000Z');
        expect(modifyDate(2, 'day', base).toISOString()).toBe('2023-03-12T00:00:00.000Z');
        expect(modifyDate(-3, 'month', base).toISOString()).toBe('2022-12-10T00:00:00.000Z');
    });

    it('dateDiff measures differences across units', () => {
        const start = new Date('2023-01-01T00:00:00.000Z');
        const end = new Date('2023-01-08T00:00:00.000Z');
        expect(dateDiff(start, end, 'day')).toBe(7);
        expect(dateDiff(start, end, 'week')).toBe(1);

        const later = new Date('2024-01-01T00:00:00.000Z');
        expect(dateDiff(start, later, 'year')).toBe(1);
        expect(dateDiff(start, later, 'month')).toBe(12);
    });

    it('startOf normalizes to the beginning of the requested unit', () => {
        const date = new Date('2023-06-15T13:24:35.123Z');
        const startDay = startOf(date, 'day');
        const expectedDay = new Date(date);
        expectedDay.setHours(0, 0, 0, 0);
        expect(startDay.getTime()).toBe(expectedDay.getTime());

        const startWeek = startOf(date, 'week');
        const expectedWeek = new Date(startDay);
        expectedWeek.setDate(expectedWeek.getDate() - expectedWeek.getDay());
        expect(startWeek.getTime()).toBe(expectedWeek.getTime());
    });

    it('startOf honors the utc option', () => {
        const date = new Date('2023-06-15T23:59:59.999Z');
        const expectedLocal = new Date(date);
        expectedLocal.setHours(0, 0, 0, 0);
        expect(startOf(date, 'day').getTime()).toBe(expectedLocal.getTime());
        expect(startOf(date, 'day', { utc: true }).toISOString()).toBe('2023-06-15T00:00:00.000Z');
    });

    it('endOf returns the last instant for the given unit', () => {
        const date = new Date('2023-06-15T13:24:35.123Z');
        const endDay = endOf(date, 'day');

        const expected = new Date(date);
        expected.setHours(23, 59, 59, 999);
        expect(endDay.getTime()).toBe(expected.getTime());

        const endMonth = endOf(date, 'month');
        const nextMonthStart = startOf(date, 'month');
        nextMonthStart.setMonth(nextMonthStart.getMonth() + 1);
        expect(endMonth.getTime()).toBe(nextMonthStart.getTime() - 1);
    });

    it('endOf honors the utc option', () => {
        const date = new Date('2023-06-15T13:24:35.123Z');
        expect(endOf(date, 'day', { utc: true }).toISOString()).toBe('2023-06-15T23:59:59.999Z');
    });

    it('isSame compares dates using the requested precision', () => {
        const a = new Date(2023, 0, 1, 0, 0, 0, 0);
        const b = new Date(2023, 0, 1, 23, 59, 59, 999);
        const c = new Date(2023, 0, 2, 0, 0, 0, 0);

        expect(isSame(a, b, 'day')).toBe(true);
        expect(isSame(a, c, 'day')).toBe(false);
    });

    it('isSame can compare using UTC rounding', () => {
        const a = new Date('2023-01-01T00:00:00.000Z');
        const b = new Date('2023-01-01T23:59:59.999Z');
        expect(isSame(a, b, 'day', { utc: true })).toBe(true);
    });
});
