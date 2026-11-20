import { Directive, ElementRef, OnDestroy, afterNextRender, inject, input } from '@angular/core';

/**
 * A quiet fade-and-rise the first time an element scrolls into view.
 *   <div appReveal [revealDelay]="120">
 * The hidden start state is only added once this directive has run, so content never stays
 * invisible if JavaScript is unavailable.
 */
@Directive({ selector: '[appReveal]' })
export class Reveal implements OnDestroy {
  revealDelay = input(0);

  private el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private io?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      this.el.classList.add('reveal');
      this.el.style.setProperty('--reveal-delay', `${this.revealDelay()}ms`);
      this.io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          this.el.classList.add('is-in');
          this.io?.disconnect();
        },
        { threshold: 0.12, rootMargin: '0px 0px -5% 0px' },
      );
      this.io.observe(this.el);
    });
  }

  ngOnDestroy() {
    this.io?.disconnect();
  }
}
