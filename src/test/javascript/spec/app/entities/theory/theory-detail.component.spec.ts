import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LearnportalTestModule } from '../../../test.module';
import { TheoryDetailComponent } from 'app/entities/theory/theory-detail.component';
import { Theory } from 'app/shared/model/theory.model';

describe('Component Tests', () => {
  describe('Theory Management Detail Component', () => {
    let comp: TheoryDetailComponent;
    let fixture: ComponentFixture<TheoryDetailComponent>;
    const route = ({ data: of({ theory: new Theory(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LearnportalTestModule],
        declarations: [TheoryDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TheoryDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TheoryDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.theory).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
