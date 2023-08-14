import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconColor, IconName } from '@ds24/elements';

@Component({
  selector: 'ds-nav-item',
  templateUrl: './nav-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavItemComponent {
  @Input() icon: IconName | null = null;
  @Input() label: string = '';
  @Input() active = false;
  @Input() routerLink: string | any[] = '/';

  iconColor = IconColor.white;
}
