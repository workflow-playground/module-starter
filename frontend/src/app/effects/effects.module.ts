import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { AuthEffects } from './auth.effects';
import { BookEffects } from './book.effects';
import { CollectionEffects } from './collection.effects';
import { RouterEffects } from './router.effects';
import { UserEffects } from './user.effects';
import { LogoutFeatureModule } from '../features/logout-dialog/logout-dialog.module';

@NgModule({
  imports: [
    LogoutFeatureModule,
    /**
     * EffectsModule.forRoot() is imported once in the root module and
     * sets up the effects class to be initialized immediately when the
     * application starts.
     *
     * See: https://ngrx.io/guide/effects#registering-root-effects
     */
    EffectsModule.forRoot(AuthEffects, BookEffects, CollectionEffects, UserEffects, RouterEffects),
  ],
})
export class AppEffectsModule {}
