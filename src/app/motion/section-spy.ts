import { Directive, ElementRef, Injectable, OnDestroy, afterNextRender, inject, input, signal } from '@angular/core';

/** Which page section is under the middle of the screen (drives the active link in the header). */
@Injectable({ providedIn: 'root' })
export class SectionSpy {
  readonly active = signal<string>('');
}

/** <section id="menu" appSpy="menu">: reports itself while it crosses the middle of the viewport. */
@Directive({ selector: '[appSpy]' })
export class Spy implements OnDestroy {
  id = input.required<string>({ alias: 'appSpy' });

  private spy = inject(SectionSpy);
  private el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private io?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      this.io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) this.spy.active.set(this.id());
          else if (this.spy.active() === this.id()) this.spy.active.set('');
        },
        { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
      );
      this.io.observe(this.el);
    });
  }

  ngOnDestroy() {
    this.io?.disconnect();
  }
}
