import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { get } from 'lodash-es';

import { Book } from '../../../types/book.types';

@Component({
  selector: 'ds-book-details',
  templateUrl: './book-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDetailsComponent {
  @Input() book!: Book;

  /**
   * Tip: Utilize getters to keep templates clean
   */
  get id() {
    return get(this.book, 'id');
  }

  get title() {
    return get(this.book, 'volumeInfo.title');
  }

  get subtitle() {
    return get(this.book, 'volumeInfo.subtitle');
  }

  get description() {
    return get(this.book, 'volumeInfo.description');
  }

  get thumbnail() {
    return get(this.book, 'volumeInfo.imageLinks.smallThumbnail', '').replace('http:', '');
  }

  get published() {
    return get(this.book, 'volumeInfo.publishedDate');
  }

  get language() {
    return get(this.book, 'volumeInfo.language');
  }

  get pages() {
    return get(this.book, 'volumeInfo.readingModes.pageCount');
  }

  get authors(): string[] {
    return get(this.book, 'volumeInfo.authors', []);
  }
}
