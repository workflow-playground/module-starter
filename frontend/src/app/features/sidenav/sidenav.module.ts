import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';

import { SidenavComponent } from './components/sidenav.component';
import { NavItemComponent } from './components/nav-item.component';
import { IconModule } from '@ds24/elements';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [NgIf, AsyncPipe, NgClass, IconModule, RouterModule, TranslateModule.forChild()],
  declarations: [SidenavComponent, NavItemComponent],
  exports: [SidenavComponent, NavItemComponent],
})
export class SidenavFeatureModule {}
