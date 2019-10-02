import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { LearnportalTestModule } from '../../../test.module';
import { QuizQuestionDeleteDialogComponent } from 'app/entities/quiz-question/quiz-question-delete-dialog.component';
import { QuizQuestionService } from 'app/entities/quiz-question/quiz-question.service';

describe('Component Tests', () => {
  describe('QuizQuestion Management Delete Component', () => {
    let comp: QuizQuestionDeleteDialogComponent;
    let fixture: ComponentFixture<QuizQuestionDeleteDialogComponent>;
    let service: QuizQuestionService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LearnportalTestModule],
        declarations: [QuizQuestionDeleteDialogComponent]
      })
        .overrideTemplate(QuizQuestionDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(QuizQuestionDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(QuizQuestionService);
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
