import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { LearnportalTestModule } from '../../../test.module';
import { QuestionAnswerDeleteDialogComponent } from 'app/entities/question-answer/question-answer-delete-dialog.component';
import { QuestionAnswerService } from 'app/entities/question-answer/question-answer.service';

describe('Component Tests', () => {
  describe('QuestionAnswer Management Delete Component', () => {
    let comp: QuestionAnswerDeleteDialogComponent;
    let fixture: ComponentFixture<QuestionAnswerDeleteDialogComponent>;
    let service: QuestionAnswerService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LearnportalTestModule],
        declarations: [QuestionAnswerDeleteDialogComponent]
      })
        .overrideTemplate(QuestionAnswerDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(QuestionAnswerDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(QuestionAnswerService);
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
