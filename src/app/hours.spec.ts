import { describeDay, isOpenAt, slotsFor, todayIso, weekdayOf, clockIn } from './hours';
import { HOURS, MENU, CATEGORIES } from './restaurant.config';

// Europe/Lisbon is UTC+0 in winter and UTC+1 in summer, so these dates pin the zone down.
const winter = (iso: string) => new Date(`${iso}Z`); // 2026-01-xx: Lisbon = UTC
const summer = (iso: string) => new Date(`${iso}Z`); // 2026-07-xx: Lisbon = UTC+1

describe('opening hours', () => {
  it('is open during dinner service and closed between services', () => {
    expect(isOpenAt(winter('2026-01-09T20:00:00'))).toBe(true); // Friday 20:00
    expect(isOpenAt(winter('2026-01-09T16:00:00'))).toBe(false); // Friday afternoon break
    expect(isOpenAt(winter('2026-01-09T13:00:00'))).toBe(true); // Friday lunch
  });

  it('is closed all day on Monday', () => {
    expect(isOpenAt(winter('2026-01-05T20:00:00'))).toBe(false);
    expect(describeDay(1)).toBe('Closed');
  });

  it('reads the clock in the restaurant\'s time zone, not the visitor\'s', () => {
    // 19:30 UTC in July is 20:30 in Lisbon (open); 23:30 UTC is 00:30 there (closed)
    expect(isOpenAt(summer('2026-07-10T19:30:00'))).toBe(true);
    expect(clockIn('Europe/Lisbon', summer('2026-07-10T23:30:00'))).toEqual({ day: 6, minutes: 30 });
    expect(isOpenAt(summer('2026-07-10T23:30:00'))).toBe(false);
  });

  it('treats the closing minute as closed', () => {
    expect(isOpenAt(winter('2026-01-07T22:29:00'))).toBe(true);
    expect(isOpenAt(winter('2026-01-07T22:30:00'))).toBe(false);
  });

  it('describes a day with two services', () => {
    expect(describeDay(3)).toBe('12:30–15:00  ·  19:00–22:30');
  });
});

describe('reservation slots', () => {
  it('stops one hour before closing', () => {
    const dinner = slotsFor(2); // Tuesday 19:00-22:30
    expect(dinner[0]).toBe('19:00');
    expect(dinner.at(-1)).toBe('21:30');
  });

  it('covers both services on a two-service day, in order', () => {
    const slots = slotsFor(3);
    expect(slots).toContain('12:30');
    expect(slots).toContain('14:00');
    expect(slots).not.toContain('14:30');
    expect(slots).toContain('19:00');
    expect([...slots].sort()).toEqual(slots);
  });

  it('has no slots when closed', () => {
    expect(slotsFor(1)).toEqual([]);
  });

  it('honours custom hours', () => {
    expect(slotsFor(0, { 0: [['10:00', '12:00']] }, 30, 30)).toEqual(['10:00', '10:30', '11:00', '11:30']);
  });
});

describe('dates', () => {
  it('finds the weekday of an ISO date without time zone drift', () => {
    expect(weekdayOf('2026-01-05')).toBe(1); // Monday
    expect(weekdayOf('2026-12-31')).toBe(4); // Thursday
    expect(weekdayOf('nonsense')).toBeNull();
  });

  it('formats today as yyyy-mm-dd in the restaurant\'s zone', () => {
    // 23:30 UTC on 10 July is already 11 July in Lisbon
    expect(todayIso('Europe/Lisbon', summer('2026-07-10T23:30:00'))).toBe('2026-07-11');
  });
});

describe('placeholder content', () => {
  it('keeps the menu to ten items at most', () => {
    expect(MENU.length).toBeLessThanOrEqual(10);
  });

  it('only uses declared categories, and every category has a dish', () => {
    expect(MENU.every((i) => (CATEGORIES as readonly string[]).includes(i.category))).toBe(true);
    for (const c of CATEGORIES) expect(MENU.some((i) => i.category === c)).toBe(true);
  });

  it('defines hours for every weekday', () => {
    for (let d = 0; d < 7; d++) expect(HOURS[d]).toBeDefined();
  });
});
