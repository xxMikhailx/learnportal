import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LearnportalTestModule } from '../../../test.module';
import { MainPageComponent } from 'app/entities/main-page/main-page.component';
import { MainPageService } from 'app/entities/main-page/main-page.service';
import { MainPage } from 'app/shared/model/main-page.model';

describe('Component Tests', () => {
  describe('MainPage Management Component', () => {
    let comp: MainPageComponent;
    let fixture: ComponentFixture<MainPageComponent>;
    let service: MainPageService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LearnportalTestModule],
        declarations: [MainPageComponent],
        providers: []
      })
        .overrideTemplate(MainPageComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MainPageComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MainPageService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MainPage(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.mainPages[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
