import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoutDialogComponent } from './logout-dialog.component';
import { ButtonModule, ModalModule } from '@ds24/elements';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

describe('Logout Dialog Component', () => {
  let fixture: ComponentFixture<LogoutDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ModalModule, ButtonModule, MatDialogModule, TranslateModule.forRoot()],
      declarations: [LogoutDialogComponent],
    });

    fixture = TestBed.createComponent(LogoutDialogComponent);
  });

  it('should compile', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
