import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { authGuard } from './auth-guard.service';

export const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  {
    path: 'books',
    loadChildren: () => import('../screens/books/books.module').then(m => m.BooksScreenModule),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('../screens/login/login.module').then(m => m.LoginScreenModule),
  },
  {
    path: '**',
    loadChildren: () => import('../screens/not-found/not-found.module').then(m => m.NotFoundScreenModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRouterModule {}
