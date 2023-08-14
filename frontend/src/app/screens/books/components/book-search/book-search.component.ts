import { Component, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { IconColor, IconName } from '@ds24/elements';

@Component({
  selector: 'ds-book-search',
  templateUrl: './book-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookSearchComponent {
  @Input() query = '';
  @Input() searching = false;
  @Input() error = '';
  @Output() search = new EventEmitter<string>();

  icons: typeof IconName = IconName;
  iconColors: typeof IconColor = IconColor;

  onSearch(event: KeyboardEvent): void {
    this.search.emit((event.target as HTMLInputElement).value);
  }
}
