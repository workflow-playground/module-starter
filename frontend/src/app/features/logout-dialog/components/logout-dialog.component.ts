import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * The dialog will close with true if user clicks the ok button,
 * otherwise it will close with undefined.
 */
@Component({
  templateUrl: './logout-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutDialogComponent {}
