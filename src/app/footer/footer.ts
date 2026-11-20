import { Component } from '@angular/core';
import { PHOTOS, RESTAURANT } from '../restaurant.config';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  protected restaurant = RESTAURANT;
  protected year = new Date().getFullYear();
  protected credits = Object.values(PHOTOS);
}
