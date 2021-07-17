import { TestBed } from '@angular/core/testing';

import { ControlFavoritesService } from './control-favorites.service';

describe('ControlFavoritesService', () => {
  let service: ControlFavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlFavoritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
