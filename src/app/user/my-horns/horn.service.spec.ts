import { TestBed } from '@angular/core/testing';

import { HornService } from './horn.service';

describe('AddHornService', () => {
    let service: HornService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(HornService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
