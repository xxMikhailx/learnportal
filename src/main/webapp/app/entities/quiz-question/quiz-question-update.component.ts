import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IQuizQuestion } from 'app/shared/model/quiz-question.model';
import { QuizQuestionService } from './quiz-question.service';
import { IQuiz } from 'app/shared/model/quiz.model';
import { QuizService } from 'app/entities/quiz';

@Component({
    selector: 'jhi-quiz-question-update',
    templateUrl: './quiz-question-update.component.html'
})
export class QuizQuestionUpdateComponent implements OnInit {
    quizQuestion: IQuizQuestion;
    isSaving: boolean;

    quizzes: IQuiz[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected quizQuestionService: QuizQuestionService,
        protected quizService: QuizService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ quizQuestion }) => {
            this.quizQuestion = quizQuestion;
        });
        this.quizService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IQuiz[]>) => mayBeOk.ok),
                map((response: HttpResponse<IQuiz[]>) => response.body)
            )
            .subscribe((res: IQuiz[]) => (this.quizzes = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.quizQuestion.id !== undefined) {
            this.subscribeToSaveResponse(this.quizQuestionService.update(this.quizQuestion));
        } else {
            this.subscribeToSaveResponse(this.quizQuestionService.create(this.quizQuestion));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuizQuestion>>) {
        result.subscribe((res: HttpResponse<IQuizQuestion>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackQuizById(index: number, item: IQuiz) {
        return item.id;
    }
}
