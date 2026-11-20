import { TestBed } from '@angular/core/testing';
import { Reserve } from './reserve';
import { notInPast, openOnDay } from './validators';
import { FormControl } from '@angular/forms';
import { todayIso, weekdayOf } from '../hours';

/** The next calendar date (today or later) that falls on the given weekday. */
function nextOn(weekday: number): string {
  const d = new Date(`${todayIso()}T00:00:00Z`);
  while (d.getUTCDay() !== weekday) d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

describe('validators', () => {
  it('rejects dates before today but accepts today', () => {
    const v = notInPast(() => '2026-06-10');
    expect(v(new FormControl('2026-06-09'))).toEqual({ past: true });
    expect(v(new FormControl('2026-06-10'))).toBeNull();
    expect(v(new FormControl(''))).toBeNull(); // emptiness is the job of `required`
  });

  it('rejects the closed day only', () => {
    const v = openOnDay();
    expect(v(new FormControl('2026-01-05'))).toEqual({ closed: true }); // Monday
    expect(v(new FormControl('2026-01-06'))).toBeNull();
  });
});

describe('Reserve', () => {
  const setup = async () => {
    TestBed.configureTestingModule({ imports: [Reserve] });
    const fixture = TestBed.createComponent(Reserve);
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    const set = async (selector: string, value: string) => {
      const input = el.querySelector<HTMLInputElement | HTMLSelectElement>(selector)!;
      input.value = value;
      input.dispatchEvent(new Event(input instanceof HTMLSelectElement ? 'change' : 'input'));
      await fixture.whenStable();
    };
    return { fixture, el, set };
  };

  it('shows what is missing instead of submitting an empty form', async () => {
    const { fixture, el } = await setup();
    el.querySelector('form')!.dispatchEvent(new Event('submit'));
    await fixture.whenStable();
    expect(el.querySelectorAll('.error').length).toBeGreaterThanOrEqual(3); // name, email, date, time
    expect(el.querySelector('.done')).toBeNull();
  });

  it('refuses the closed day with a clear message and offers no times', async () => {
    const { fixture, el, set } = await setup();
    await set('#r-date', nextOn(1)); // Monday
    el.querySelector<HTMLInputElement>('#r-date')!.dispatchEvent(new Event('blur'));
    await fixture.whenStable();
    expect(el.querySelector('#r-date-err')?.textContent).toContain('closed');
    expect(el.querySelectorAll('#r-time option').length).toBe(1); // only the placeholder
  });

  it('offers times for an open day and clears the chosen time when the date changes', async () => {
    const { fixture, el, set } = await setup();
    await set('#r-date', nextOn(3)); // Wednesday: lunch and dinner
    const options = () => Array.from(el.querySelectorAll<HTMLOptionElement>('#r-time option')).map((o) => o.value).filter(Boolean);
    expect(options()).toContain('12:30');
    expect(options()).toContain('19:00');

    await set('#r-time', '19:00');
    expect(el.querySelector<HTMLSelectElement>('#r-time')!.value).toBe('19:00');

    await set('#r-date', nextOn(2)); // Tuesday has no lunch service: 12:30 gone, 19:00 stays
    expect(options()).not.toContain('12:30');
    await set('#r-date', nextOn(1)); // Monday: closed, so the time must be cleared
    expect(el.querySelector<HTMLSelectElement>('#r-time')!.value).toBe('');
  });

  it('confirms a valid booking, then lets you start another', async () => {
    {
      const { fixture, el, set } = await setup();
      await set('#r-name', 'Ana Test');
      await set('#r-email', 'ana@example.com');
      await set('#r-date', nextOn(5)); // Friday
      await set('#r-time', '19:00');
      el.querySelector('form')!.dispatchEvent(new Event('submit'));
      await fixture.whenStable();
      expect(el.querySelector<HTMLButtonElement>('form button[type=submit]')!.textContent).toContain('Sending');

      await new Promise((r) => setTimeout(r, 850)); // the demo form 'sends' for 700ms
      await fixture.whenStable();
      const done = el.querySelector('.done')!;
      expect(done.textContent).toContain('Ana Test');
      expect(done.textContent).toContain('19:00');
      expect(weekdayOf(nextOn(5))).toBe(5);
      expect(done.textContent).toContain('Friday');

      el.querySelector<HTMLButtonElement>('.done button')!.click();
      await fixture.whenStable();
      expect(el.querySelector('form')).not.toBeNull();
    }
  });
});
