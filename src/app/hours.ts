import { HOURS, Range, RESTAURANT } from './restaurant.config';

export const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

const toHHMM = (minutes: number) => `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;

/** Weekday (0 = Sunday) and minutes since midnight in the restaurant's own time zone, wherever the visitor is. */
export function clockIn(timeZone: string, date: Date): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}

export function rangesOn(day: number, hours: Record<number, readonly Range[]> = HOURS): readonly Range[] {
  return hours[day] ?? [];
}

export function isOpenAt(date: Date, hours = HOURS, timeZone: string = RESTAURANT.timeZone): boolean {
  const { day, minutes } = clockIn(timeZone, date);
  return rangesOn(day, hours).some(([open, close]) => minutes >= toMinutes(open) && minutes < toMinutes(close));
}

/** "12:30-15:00 · 19:00-22:30", or "Closed" */
export function describeDay(day: number, hours = HOURS): string {
  const ranges = rangesOn(day, hours);
  return ranges.length ? ranges.map(([a, b]) => `${a}–${b}`).join('  ·  ') : 'Closed';
}

/**
 * Bookable times on a weekday: every `step` minutes from opening, and the last one
 * `lastSeatingBeforeClose` minutes before closing (nobody should start omakase at closing time).
 */
export function slotsFor(day: number, hours = HOURS, step = 30, lastSeatingBeforeClose = 60): string[] {
  return rangesOn(day, hours).flatMap(([open, close]) => {
    const slots: string[] = [];
    for (let t = toMinutes(open); t <= toMinutes(close) - lastSeatingBeforeClose; t += step) slots.push(toHHMM(t));
    return slots;
  });
}

/** Weekday of a yyyy-mm-dd string, read as a plain calendar date (no time zone shifts). */
export function weekdayOf(isoDate: string): number | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!m) return null;
  return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3])).getUTCDay();
}

/** Today as yyyy-mm-dd in the restaurant's time zone (used as the earliest bookable date). */
export function todayIso(timeZone: string = RESTAURANT.timeZone, date = new Date()): string {
  const p = new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
  return p; // en-CA formats as yyyy-mm-dd
}
