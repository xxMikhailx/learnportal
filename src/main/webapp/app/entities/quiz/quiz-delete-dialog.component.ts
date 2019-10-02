import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQuiz } from 'app/shared/model/quiz.model';
import { QuizService } from './quiz.service';

@Component({
  selector: 'jhi-quiz-delete-dialog',
  templateUrl: './quiz-delete-dialog.component.html'
})
export class QuizDeleteDialogComponent {
  quiz: IQuiz;

  constructor(protected quizService: QuizService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.quizService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'quizListModification',
        content: 'Deleted an quiz'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-quiz-delete-popup',
  template: ''
})
export class QuizDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ quiz }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(QuizDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.quiz = quiz;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/quiz', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/quiz', { outlets: { popup: null } }]);
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
