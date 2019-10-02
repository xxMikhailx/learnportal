import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IQuestionAnswer } from 'app/shared/model/question-answer.model';
import { AccountService } from 'app/core';
import { QuestionAnswerService } from './question-answer.service';

@Component({
    selector: 'jhi-question-answer',
    templateUrl: './question-answer.component.html'
})
export class QuestionAnswerComponent implements OnInit, OnDestroy {
    questionAnswers: IQuestionAnswer[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected questionAnswerService: QuestionAnswerService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.questionAnswerService
            .query()
            .pipe(
                filter((res: HttpResponse<IQuestionAnswer[]>) => res.ok),
                map((res: HttpResponse<IQuestionAnswer[]>) => res.body)
            )
            .subscribe(
                (res: IQuestionAnswer[]) => {
                    this.questionAnswers = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInQuestionAnswers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IQuestionAnswer) {
        return item.id;
    }

    registerChangeInQuestionAnswers() {
        this.eventSubscriber = this.eventManager.subscribe('questionAnswerListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
