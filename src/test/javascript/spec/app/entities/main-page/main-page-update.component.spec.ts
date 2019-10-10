import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { LearnportalTestModule } from '../../../test.module';
import { MainPageUpdateComponent } from 'app/entities/main-page/main-page-update.component';
import { MainPageService } from 'app/entities/main-page/main-page.service';
import { MainPage } from 'app/shared/model/main-page.model';

describe('Component Tests', () => {
  describe('MainPage Management Update Component', () => {
    let comp: MainPageUpdateComponent;
    let fixture: ComponentFixture<MainPageUpdateComponent>;
    let service: MainPageService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LearnportalTestModule],
        declarations: [MainPageUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MainPageUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MainPageUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MainPageService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MainPage(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new MainPage();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
