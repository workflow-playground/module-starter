import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { get } from 'lodash-es';
import { Book } from '../../../types/book.types';

@Component({
  selector: 'ds-book-card',
  templateUrl: './book-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookCardComponent {
  @Input() book: Partial<Book> = {};

  get id(): string {
    return get(this.book, 'id', '');
  }

  get title(): string {
    return get(this.book, 'volumeInfo.title', '');
  }

  get subtitle(): string {
    return get(this.book, 'volumeInfo.subtitle', '');
  }

  get description(): string {
    return get(this.book, 'volumeInfo.description', '');
  }

  get thumbnail(): string {
    return get(this.book, 'volumeInfo.imageLinks.smallThumbnail', '').replace('http:', '');
  }

  get authors(): string[] {
    return get(this.book, 'volumeInfo.authors', []);
  }
}
