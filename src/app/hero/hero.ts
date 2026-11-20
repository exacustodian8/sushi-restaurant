import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { RESTAURANT, PHOTOS } from '../restaurant.config';
import { clockIn, describeDay, isOpenAt } from '../hours';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  protected restaurant = RESTAURANT;
  protected photo = PHOTOS['hero'];

  private now = signal(new Date());
  protected open = computed(() => isOpenAt(this.now()));
  protected today = computed(() => describeDay(clockIn(RESTAURANT.timeZone, this.now()).day));

  constructor() {
    const tick = setInterval(() => this.now.set(new Date()), 60_000);
    inject(DestroyRef).onDestroy(() => clearInterval(tick));
  }
}
