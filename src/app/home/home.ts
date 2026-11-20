import { Component } from '@angular/core';
import { Hero } from '../hero/hero';
import { About } from '../about/about';
import { Menu } from '../menu/menu';
import { Gallery } from '../gallery/gallery';
import { Reserve } from '../reserve/reserve';
import { Visit } from '../visit/visit';

/** The whole one-page site, top to bottom. The map (inside Visit) is the last thing before the footer. */
@Component({
  selector: 'app-home',
  imports: [Hero, About, Menu, Gallery, Reserve, Visit],
  template: `
    <app-hero />
    <app-about />
    <app-menu />
    <app-gallery />
    <app-reserve />
    <app-visit />
  `,
})
export class Home {}
