import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQuizQuestion } from 'app/shared/model/quiz-question.model';
import { QuizQuestionService } from './quiz-question.service';

@Component({
  selector: 'jhi-quiz-question-delete-dialog',
  templateUrl: './quiz-question-delete-dialog.component.html'
})
export class QuizQuestionDeleteDialogComponent {
  quizQuestion: IQuizQuestion;

  constructor(
    protected quizQuestionService: QuizQuestionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.quizQuestionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'quizQuestionListModification',
        content: 'Deleted an quizQuestion'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-quiz-question-delete-popup',
  template: ''
})
export class QuizQuestionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ quizQuestion }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(QuizQuestionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.quizQuestion = quizQuestion;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/quiz-question', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/quiz-question', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
