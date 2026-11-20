import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { GALLERY, PHOTOS, Photo } from '../restaurant.config';
import { Reveal } from '../motion/reveal';
import { Spy } from '../motion/section-spy';

@Component({
  selector: 'app-gallery',
  imports: [Reveal, Spy],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery {
  protected photos: Photo[] = GALLERY.map((k) => PHOTOS[k]);
  protected current = signal<Photo | null>(null);
  private dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  protected open(photo: Photo) {
    this.current.set(photo);
    this.dialog().nativeElement.showModal();
  }

  protected backdropClose(e: MouseEvent) {
    if (e.target === this.dialog().nativeElement) this.dialog().nativeElement.close();
  }
}
