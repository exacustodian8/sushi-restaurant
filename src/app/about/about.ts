import { Component } from '@angular/core';
import { PHOTOS, RESTAURANT } from '../restaurant.config';
import { Reveal } from '../motion/reveal';
import { Spy } from '../motion/section-spy';

@Component({
  selector: 'app-about',
  imports: [Reveal, Spy],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  protected restaurant = RESTAURANT;
  protected photo = PHOTOS['sashimi'];

  /** PLACEHOLDER copy */
  protected principles = [
    { n: '01', title: 'Rice first', text: 'Short-grain rice, seasoned with a blend of two vinegars and served at body temperature.' },
    { n: '02', title: 'Cut to order', text: 'Nothing is sliced until you are ready for it. The counter sets the pace of the evening.' },
    { n: '03', title: 'The season decides', text: 'The menu follows the market, so some dishes appear for only a few weeks a year.' },
  ];
}
