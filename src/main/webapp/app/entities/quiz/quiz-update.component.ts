import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IQuiz } from 'app/shared/model/quiz.model';
import { QuizService } from './quiz.service';
import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from 'app/entities/category';

@Component({
    selector: 'jhi-quiz-update',
    templateUrl: './quiz-update.component.html'
})
export class QuizUpdateComponent implements OnInit {
    quiz: IQuiz;
    isSaving: boolean;

    categories: ICategory[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected quizService: QuizService,
        protected categoryService: CategoryService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ quiz }) => {
            this.quiz = quiz;
        });
        this.categoryService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICategory[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICategory[]>) => response.body)
            )
            .subscribe((res: ICategory[]) => (this.categories = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.quiz.id !== undefined) {
            this.subscribeToSaveResponse(this.quizService.update(this.quiz));
        } else {
            this.subscribeToSaveResponse(this.quizService.create(this.quiz));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuiz>>) {
        result.subscribe((res: HttpResponse<IQuiz>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCategoryById(index: number, item: ICategory) {
        return item.id;
    }
}
