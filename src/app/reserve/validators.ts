import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { HOURS } from '../restaurant.config';
import { rangesOn, todayIso, weekdayOf } from '../hours';

/** The chosen date must be today or later (in the restaurant's own time zone). */
export function notInPast(today: () => string = todayIso): ValidatorFn {
  return (c: AbstractControl): ValidationErrors | null => {
    const v = c.value as string;
    return v && v < today() ? { past: true } : null;
  };
}

/** The restaurant must be open on the chosen weekday. */
export function openOnDay(hours = HOURS): ValidatorFn {
  return (c: AbstractControl): ValidationErrors | null => {
    const day = weekdayOf(c.value as string);
    return day !== null && rangesOn(day, hours).length === 0 ? { closed: true } : null;
  };
}
