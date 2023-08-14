import { NgModule } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule, DsFormsModule } from '@ds24/elements';
import { TranslateModule } from '@ngx-translate/core';

import { LoginPageComponent } from './components/login-page.component';

export const COMPONENTS = [LoginPageComponent];

const routes: Routes = [{ path: '', component: LoginPageComponent, data: { title: 'Login', page: 'login' } }];

@NgModule({
  imports: [
    NgIf,
    AsyncPipe,
    ReactiveFormsModule,
    DsFormsModule,
    ButtonModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
  ],
  declarations: COMPONENTS,
})
export class LoginScreenModule {}
