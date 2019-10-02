import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQuestionAnswer } from 'app/shared/model/question-answer.model';
import { QuestionAnswerService } from './question-answer.service';

@Component({
    selector: 'jhi-question-answer-delete-dialog',
    templateUrl: './question-answer-delete-dialog.component.html'
})
export class QuestionAnswerDeleteDialogComponent {
    questionAnswer: IQuestionAnswer;

    constructor(
        protected questionAnswerService: QuestionAnswerService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.questionAnswerService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'questionAnswerListModification',
                content: 'Deleted an questionAnswer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-question-answer-delete-popup',
    template: ''
})
export class QuestionAnswerDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ questionAnswer }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QuestionAnswerDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.questionAnswer = questionAnswer;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/question-answer', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/question-answer', { outlets: { popup: null } }]);
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
