import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { BookStorageService } from './book-storage.service';
import { GoogleBooksService } from './google-books.service';

@NgModule({
  providers: [AuthService, BookStorageService, GoogleBooksService],
})
export class AppServicesModule {}
