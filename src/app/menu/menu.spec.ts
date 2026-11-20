import { TestBed } from '@angular/core/testing';
import { Menu } from './menu';
import { MENU } from '../restaurant.config';

describe('Menu', () => {
  const setup = async () => {
    TestBed.configureTestingModule({ imports: [Menu] });
    const fixture = TestBed.createComponent(Menu);
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    const tab = (name: string) => Array.from(el.querySelectorAll<HTMLButtonElement>('[role=tab]')).find((b) => b.textContent!.trim().startsWith(name))!;
    return { fixture, el, tab };
  };

  it('lists every dish, grouped by category, at first', async () => {
    const { el } = await setup();
    expect(el.querySelectorAll('.dish').length).toBe(MENU.length);
    expect(el.querySelectorAll('.group').length).toBe(5);
  });

  it('formats prices as euros', async () => {
    const { el } = await setup();
    expect(el.querySelector('.dish__price')?.textContent).toMatch(/€\s?\d+/);
  });

  it('narrows to one category when its tab is chosen, and marks the tab as selected', async () => {
    const { fixture, el, tab } = await setup();
    tab('Nigiri').click();
    await fixture.whenStable();

    const names = Array.from(el.querySelectorAll('.dish__name')).map((n) => n.textContent);
    expect(names).toEqual(MENU.filter((i) => i.category === 'Nigiri').map((i) => i.name));
    expect(tab('Nigiri').getAttribute('aria-selected')).toBe('true');
    expect(tab('All').getAttribute('aria-selected')).toBe('false');

    tab('All').click();
    await fixture.whenStable();
    expect(el.querySelectorAll('.dish').length).toBe(MENU.length);
  });

  it('shows the tag labels for dishes that have them', async () => {
    const { el } = await setup();
    const tagged = MENU.filter((i) => i.tags.length).length;
    expect(el.querySelectorAll('.dish__tags').length).toBe(tagged);
  });
});
