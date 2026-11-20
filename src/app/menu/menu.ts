import { Component, computed, signal } from '@angular/core';
import { CATEGORIES, Category, MENU, MenuItem, RESTAURANT, Tag } from '../restaurant.config';
import { Reveal } from '../motion/reveal';
import { Spy } from '../motion/section-spy';

type Filter = 'All' | Category;

const TAG_LABEL: Record<Tag, string> = { vegetarian: 'Vegetarian', spicy: 'Spicy', chef: 'Chef’s pick' };

@Component({
  selector: 'app-menu',
  imports: [Reveal, Spy],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  protected filters: Filter[] = ['All', ...CATEGORIES];
  protected selected = signal<Filter>('All');

  /** items grouped by category, narrowed by the selected tab */
  protected groups = computed(() =>
    CATEGORIES.filter((c) => this.selected() === 'All' || this.selected() === c)
      .map((name) => ({ name, items: MENU.filter((i) => i.category === name) }))
      .filter((g) => g.items.length),
  );

  private money = new Intl.NumberFormat(RESTAURANT.locale, { style: 'currency', currency: RESTAURANT.currency, minimumFractionDigits: 0 });
  protected price(item: MenuItem) {
    return this.money.format(item.price);
  }
  protected tagLabel(t: Tag) {
    return TAG_LABEL[t];
  }
  protected count(f: Filter) {
    return f === 'All' ? MENU.length : MENU.filter((i) => i.category === f).length;
  }
}
