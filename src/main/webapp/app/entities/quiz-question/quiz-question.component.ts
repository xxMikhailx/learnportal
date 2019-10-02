import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IQuizQuestion } from 'app/shared/model/quiz-question.model';
import { AccountService } from 'app/core/auth/account.service';
import { QuizQuestionService } from './quiz-question.service';

@Component({
  selector: 'jhi-quiz-question',
  templateUrl: './quiz-question.component.html'
})
export class QuizQuestionComponent implements OnInit, OnDestroy {
  quizQuestions: IQuizQuestion[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected quizQuestionService: QuizQuestionService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.quizQuestionService
      .query()
      .pipe(
        filter((res: HttpResponse<IQuizQuestion[]>) => res.ok),
        map((res: HttpResponse<IQuizQuestion[]>) => res.body)
      )
      .subscribe(
        (res: IQuizQuestion[]) => {
          this.quizQuestions = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInQuizQuestions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IQuizQuestion) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInQuizQuestions() {
    this.eventSubscriber = this.eventManager.subscribe('quizQuestionListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
