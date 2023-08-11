import { NgModule } from '@angular/core';
import { ModalModule, ButtonModule } from '@ds24/elements';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

import { LogoutDialogComponent } from './components/logout-dialog.component';

@NgModule({
  imports: [ModalModule, ButtonModule, MatDialogModule, TranslateModule],
  declarations: [LogoutDialogComponent],
})
export class LogoutFeatureModule {}
