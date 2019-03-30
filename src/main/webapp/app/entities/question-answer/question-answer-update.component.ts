import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IQuestionAnswer } from 'app/shared/model/question-answer.model';
import { QuestionAnswerService } from './question-answer.service';
import { IQuizQuestion } from 'app/shared/model/quiz-question.model';
import { QuizQuestionService } from 'app/entities/quiz-question';

@Component({
    selector: 'jhi-question-answer-update',
    templateUrl: './question-answer-update.component.html'
})
export class QuestionAnswerUpdateComponent implements OnInit {
    questionAnswer: IQuestionAnswer;
    isSaving: boolean;

    quizquestions: IQuizQuestion[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected questionAnswerService: QuestionAnswerService,
        protected quizQuestionService: QuizQuestionService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ questionAnswer }) => {
            this.questionAnswer = questionAnswer;
        });
        this.quizQuestionService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IQuizQuestion[]>) => mayBeOk.ok),
                map((response: HttpResponse<IQuizQuestion[]>) => response.body)
            )
            .subscribe((res: IQuizQuestion[]) => (this.quizquestions = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.questionAnswer.id !== undefined) {
            this.subscribeToSaveResponse(this.questionAnswerService.update(this.questionAnswer));
        } else {
            this.subscribeToSaveResponse(this.questionAnswerService.create(this.questionAnswer));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuestionAnswer>>) {
        result.subscribe((res: HttpResponse<IQuestionAnswer>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackQuizQuestionById(index: number, item: IQuizQuestion) {
        return item.id;
    }
}
