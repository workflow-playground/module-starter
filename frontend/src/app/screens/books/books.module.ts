import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule, ImageModule, LoaderModule } from '@ds24/elements';
import { TranslateModule } from '@ngx-translate/core';

import { BooksRoutingModule } from './router/router.module';

import { CollectionPageComponent } from './components/collection-page/collection-page.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookDetailsPageComponent } from './components/book-details-page/book-details-page.component';
import { BookSearchComponent } from './components/book-search/book-search.component';
import { FindBookPageComponent } from './components/find-book-page/find-book-page.component';

import { PipesModule } from '../../shared/pipes/pipes.module';

export const COMPONENTS = [
  BookDetailsComponent,
  BookSearchComponent,
  BookCardComponent,
  CollectionPageComponent,
  BookDetailsPageComponent,
  FindBookPageComponent,
];

@NgModule({
  imports: [
    CommonModule,
    BooksRoutingModule,
    PipesModule,
    ImageModule,
    IconModule,
    LoaderModule,
    TranslateModule.forChild(),
  ],
  declarations: COMPONENTS,
})
export class BooksScreenModule {}
