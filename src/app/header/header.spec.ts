import { TestBed } from '@angular/core/testing';
import { Header } from './header';
import { SectionSpy } from '../motion/section-spy';

describe('Header', () => {
  const setup = async () => {
    TestBed.configureTestingModule({ imports: [Header] });
    const fixture = TestBed.createComponent(Header);
    await fixture.whenStable();
    return { fixture, el: fixture.nativeElement as HTMLElement };
  };

  it('opens and closes the mobile menu, and closes it after choosing a link', async () => {
    const { fixture, el } = await setup();
    const burger = el.querySelector<HTMLButtonElement>('.burger')!;
    expect(burger.getAttribute('aria-expanded')).toBe('false');

    burger.click();
    await fixture.whenStable();
    expect(burger.getAttribute('aria-expanded')).toBe('true');
    expect(el.querySelector('.nav')!.classList).toContain('is-open');

    el.querySelector<HTMLAnchorElement>('.nav a')!.click();
    await fixture.whenStable();
    expect(burger.getAttribute('aria-expanded')).toBe('false');
  });

  it('marks the link of the section currently in view', async () => {
    const { fixture, el } = await setup();
    TestBed.inject(SectionSpy).active.set('menu');
    await fixture.whenStable();
    const active = el.querySelector('.nav a.is-active');
    expect(active?.textContent?.trim()).toBe('Menu');
    expect(active?.getAttribute('aria-current')).toBe('true');
  });

  it('links to every section on the page', async () => {
    const { el } = await setup();
    const targets = Array.from(el.querySelectorAll<HTMLAnchorElement>('.nav a')).map((a) => a.getAttribute('href'));
    expect(targets).toEqual(expect.arrayContaining(['#about', '#menu', '#gallery', '#reserve', '#visit']));
  });
});
