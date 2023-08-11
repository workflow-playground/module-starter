import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRouterModule } from './router/router.module';
import { AppComponent } from './app.component';
import { AppStoreModule } from './store/store.module';
import { AppEffectsModule } from './effects/effects.module';
import { AppServicesModule } from './services/services.module';
import { SidenavFeatureModule } from './features/sidenav/sidenav.module';
import { LayoutFeatureModule } from './features/layout/layout.module';
import { TranslationModule } from './translations/translations.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    LayoutFeatureModule,
    SidenavFeatureModule,

    AppStoreModule,
    AppRouterModule,
    AppEffectsModule,
    AppServicesModule,
    TranslationModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
