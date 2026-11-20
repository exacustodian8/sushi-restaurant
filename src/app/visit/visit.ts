import { Component, computed, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RESTAURANT } from '../restaurant.config';
import { clockIn, describeDay, WEEKDAYS } from '../hours';
import { Reveal } from '../motion/reveal';
import { Spy } from '../motion/section-spy';

/** how far the embedded map reaches from the pin (degrees); smaller = closer */
const SPAN = { lat: 0.0022, lng: 0.0038 };

@Component({
  selector: 'app-visit',
  imports: [Reveal, Spy],
  templateUrl: './visit.html',
  styleUrl: './visit.css',
})
export class Visit {
  protected restaurant = RESTAURANT;
  private sanitizer = inject(DomSanitizer);

  /** Monday first, as people read a weekly schedule */
  protected week = [1, 2, 3, 4, 5, 6, 0].map((d) => ({ day: d, name: WEEKDAYS[d], hours: describeDay(d) }));
  protected today = computed(() => clockIn(RESTAURANT.timeZone, new Date()).day);

  private lat = RESTAURANT.location.lat;
  private lng = RESTAURANT.location.lng;

  /**
   * OpenStreetMap's own embed: free, no API key. The URL is built only from the constants in
   * restaurant.config.ts, never from user input, so marking it trusted is safe.
   */
  protected mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    `https://www.openstreetmap.org/export/embed.html?bbox=${this.lng - SPAN.lng},${this.lat - SPAN.lat},${this.lng + SPAN.lng},${this.lat + SPAN.lat}&layer=mapnik&marker=${this.lat},${this.lng}`,
  );

  protected directionsUrl = `https://www.openstreetmap.org/directions?to=${this.lat}%2C${this.lng}`;
  protected bigMapUrl = `https://www.openstreetmap.org/?mlat=${this.lat}&mlon=${this.lng}#map=17/${this.lat}/${this.lng}`;
}
