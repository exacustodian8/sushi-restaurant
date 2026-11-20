import { Component, DOCUMENT, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { restaurantJsonLd } from './seo';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor() {
    // structured data for search engines (opening hours, address, cuisine), generated from the config
    const doc = inject(DOCUMENT);
    const script = doc.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(restaurantJsonLd());
    doc.head.appendChild(script);
  }
}
