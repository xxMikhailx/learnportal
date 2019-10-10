import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { LearnportalTestModule } from '../../../test.module';
import { MainPageDeleteDialogComponent } from 'app/entities/main-page/main-page-delete-dialog.component';
import { MainPageService } from 'app/entities/main-page/main-page.service';

describe('Component Tests', () => {
  describe('MainPage Management Delete Component', () => {
    let comp: MainPageDeleteDialogComponent;
    let fixture: ComponentFixture<MainPageDeleteDialogComponent>;
    let service: MainPageService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LearnportalTestModule],
        declarations: [MainPageDeleteDialogComponent]
      })
        .overrideTemplate(MainPageDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MainPageDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MainPageService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
