import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RESTAURANT } from '../restaurant.config';
import { slotsFor, todayIso, weekdayOf, WEEKDAYS } from '../hours';
import { Reveal } from '../motion/reveal';
import { Spy } from '../motion/section-spy';
import { notInPast, openOnDay } from './validators';

@Component({
  selector: 'app-reserve',
  imports: [ReactiveFormsModule, Reveal, Spy],
  templateUrl: './reserve.html',
  styleUrl: './reserve.css',
})
export class Reserve {
  private fb = inject(FormBuilder);
  protected restaurant = RESTAURANT;
  protected minDate = todayIso();
  protected partySizes = Array.from({ length: RESTAURANT.maxPartySize }, (_, i) => i + 1);

  protected form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    date: ['', [Validators.required, notInPast(), openOnDay()]],
    time: ['', Validators.required],
    guests: [2, [Validators.required, Validators.min(1), Validators.max(RESTAURANT.maxPartySize)]],
    notes: [''],
  });

  private date = toSignal(this.form.controls.date.valueChanges, { initialValue: '' });

  /** bookable times for the chosen date (empty until a valid, open date is picked) */
  protected slots = computed(() => {
    const day = weekdayOf(this.date());
    return day === null || this.form.controls.date.invalid ? [] : slotsFor(day);
  });

  protected status = signal<'idle' | 'sending' | 'sent'>('idle');
  protected booking = signal<{ name: string; email: string; when: string; time: string; guests: number } | null>(null);

  constructor() {
    // changing the date can make the previously chosen time invalid
    effect(() => {
      if (!this.slots().includes(this.form.controls.time.value)) this.form.controls.time.setValue('');
    });
  }

  protected showError(name: 'name' | 'email' | 'date' | 'time') {
    const c = this.form.controls[name];
    return c.invalid && (c.touched || c.dirty);
  }

  protected submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.status.set('sending');
    const v = this.form.getRawValue();
    // PLACEHOLDER: no backend yet. Replace this timeout with a POST to your booking endpoint or provider.
    setTimeout(() => {
      const day = weekdayOf(v.date)!;
      this.booking.set({ name: v.name, email: v.email, when: `${WEEKDAYS[day]} ${v.date}`, time: v.time, guests: v.guests });
      this.status.set('sent');
    }, 700);
  }

  protected reset() {
    this.form.reset({ guests: 2 });
    this.booking.set(null);
    this.status.set('idle');
  }
}
