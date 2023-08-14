import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';

import { LoginPageComponent } from './login-page.component';
import * as selectors from '../../../store/selectors';
import { State } from '../../../store/state';
import * as actions from '../../../store/actions';

describe('Login Page', () => {
  let fixture: ComponentFixture<LoginPageComponent>;
  let instance: LoginPageComponent;
  let mockStore: MockStore<State>;
  let selectLoginPageError: MemoizedSelector<State, string | null>;
  let selectLoginPagePending: MemoizedSelector<State, boolean>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TranslateModule.forRoot()],
      declarations: [LoginPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [provideMockStore()],
    });

    fixture = TestBed.createComponent(LoginPageComponent);
    instance = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    selectLoginPageError = mockStore.overrideSelector(selectors.loginPage.selectLoginPageError, null);
    selectLoginPagePending = mockStore.overrideSelector(selectors.loginPage.selectLoginPagePending, false);

    jest.spyOn(mockStore, 'dispatch');
  });

  it('should compile', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should disable the form if pending', () => {
    selectLoginPagePending.setResult(true);
    mockStore.refreshState();
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should display an error message if provided', () => {
    selectLoginPageError.setResult('Invalid Credentials');
    mockStore.refreshState();
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch an action if the form is valid when submitted', () => {
    const credentials = {
      username: 'user',
      password: 'pass',
    };

    instance.form.setValue(credentials);


    instance.submit();

    expect(mockStore.dispatch).toHaveBeenCalledWith(actions.loginPage.login({ credentials }));
  });
});
