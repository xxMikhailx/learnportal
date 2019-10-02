import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { LearnportalTestModule } from '../../../test.module';
import { TaskGivenDataDeleteDialogComponent } from 'app/entities/task-given-data/task-given-data-delete-dialog.component';
import { TaskGivenDataService } from 'app/entities/task-given-data/task-given-data.service';

describe('Component Tests', () => {
  describe('TaskGivenData Management Delete Component', () => {
    let comp: TaskGivenDataDeleteDialogComponent;
    let fixture: ComponentFixture<TaskGivenDataDeleteDialogComponent>;
    let service: TaskGivenDataService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LearnportalTestModule],
        declarations: [TaskGivenDataDeleteDialogComponent]
      })
        .overrideTemplate(TaskGivenDataDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TaskGivenDataDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TaskGivenDataService);
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
