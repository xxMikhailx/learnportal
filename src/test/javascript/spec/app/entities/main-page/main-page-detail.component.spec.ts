import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LearnportalTestModule } from '../../../test.module';
import { MainPageDetailComponent } from 'app/entities/main-page/main-page-detail.component';
import { MainPage } from 'app/shared/model/main-page.model';

describe('Component Tests', () => {
  describe('MainPage Management Detail Component', () => {
    let comp: MainPageDetailComponent;
    let fixture: ComponentFixture<MainPageDetailComponent>;
    const route = ({ data: of({ mainPage: new MainPage(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LearnportalTestModule],
        declarations: [MainPageDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MainPageDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MainPageDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.mainPage).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
