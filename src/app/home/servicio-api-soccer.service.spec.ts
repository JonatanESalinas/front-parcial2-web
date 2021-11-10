import { TestBed } from '@angular/core/testing';

import { ServicioApiSoccerService } from './servicio-api-soccer.service';

describe('ServicioApiSoccerService', () => {
  let service: ServicioApiSoccerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioApiSoccerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
