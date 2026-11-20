import { Component, afterNextRender, inject, signal } from '@angular/core';
import { RESTAURANT } from '../restaurant.config';
import { SectionSpy } from '../motion/section-spy';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  protected restaurant = RESTAURANT;
  protected spy = inject(SectionSpy);

  protected links = [
    { id: 'about', label: 'Story' },
    { id: 'menu', label: 'Menu' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'reserve', label: 'Reserve' },
    { id: 'visit', label: 'Visit' },
  ];

  protected open = signal(false);
  /** becomes true after the hero, so the bar turns solid when it sits over content */
  protected solid = signal(false);

  constructor() {
    afterNextRender(() => {
      const update = () => this.solid.set(scrollY > 60);
      addEventListener('scroll', update, { passive: true });
      update();
    });
  }

  protected toggle() {
    this.open.update((o) => !o);
  }

  protected close() {
    this.open.set(false);
  }
}
