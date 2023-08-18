import { Title } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { Actions } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { provideMockStore } from '@ngrx/store/testing';

import { RouterEffects } from './router.effects';
import { selectors } from '../store';

describe('RouterEffects', () => {
  let effects: RouterEffects;
  let titleService: Title;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RouterEffects,
        {
          provide: Actions,
          useValue: of(routerNavigatedAction),
        },
        provideMockStore({
          selectors: [
            { selector: selectors.router.selectRouteData, value: { title: 'Search' } },
          ],
        }),
        { provide: Title, useValue: { setTitle: jest.fn() } },
      ],
    });

    effects = TestBed.inject(RouterEffects);
    titleService = TestBed.inject(Title);
  });

  describe('updateTitle$', () => {
    it('should update the title on router navigation', () => {
      effects.updateTitle$.subscribe();
      expect(titleService.setTitle).toHaveBeenCalledWith(
        'DS24 Application Reference - Search'
      );
    });
  });
});
