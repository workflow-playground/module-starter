import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as selectors from '../../../store/selectors';
import { IconColor, IconName } from '@ds24/elements';

@Component({
  selector: 'ds-collection-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './collection-page.component.html',
})
export class CollectionPageComponent {
  icons: typeof IconName = IconName;
  iconColors: typeof IconColor = IconColor;

  books$ = this.store.select(selectors.collection.selectBookCollection);


  constructor(private store: Store) {

  }
}
