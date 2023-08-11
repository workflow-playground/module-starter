import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CollectionPageComponent } from '../components/collection-page.component';
import { bookExistsGuard } from './book-exists.guard';
import { BookDetailsPageComponent } from '../components/book-details-page.component';
import { FindBookPageComponent } from '../components/find-book-page.component';

export const routes: Routes = [
  {
    path: 'find',
    component: FindBookPageComponent,
    data: { title: 'Find book', page: 'books' },
  },
  {
    path: ':id',
    component: BookDetailsPageComponent,
    canActivate: [bookExistsGuard],
    data: { title: 'Book details', page: 'collection' },
  },
  {
    path: '',
    component: CollectionPageComponent,
    data: { title: 'Collection', page: 'collection' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
