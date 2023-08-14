import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IconModule, ImageModule } from '@ds24/elements';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

import { CollectionPageComponent } from './collection-page.component';
import { BookCardComponent } from '../book-card/book-card.component';
import { State, selectors } from '../../../../store';
import { bookMock } from '../../../../types/book.types.mock';
import { PipesModule } from '../../../../shared/pipes/pipes.module';

describe('Collection Page', () => {
  let fixture: ComponentFixture<CollectionPageComponent>;
  let mockStore: MockStore<State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IconModule, PipesModule, ImageModule, TranslateModule.forRoot(), RouterTestingModule],
      declarations: [CollectionPageComponent, BookCardComponent],
      providers: [provideMockStore()],
    });

    fixture = TestBed.createComponent(CollectionPageComponent);
    mockStore = TestBed.inject(MockStore);
    mockStore.overrideSelector(selectors.collection.selectBookCollection, [bookMock]);

    jest.spyOn(mockStore, 'dispatch');
  });

  it('should compile', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
