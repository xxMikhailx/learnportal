import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IQuiz, Quiz } from 'app/shared/model/quiz.model';
import { QuizService } from './quiz.service';
import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from 'app/entities/category/category.service';

@Component({
  selector: 'jhi-quiz-update',
  templateUrl: './quiz-update.component.html'
})
export class QuizUpdateComponent implements OnInit {
  isSaving: boolean;

  categories: ICategory[];

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    description: [],
    category: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected quizService: QuizService,
    protected categoryService: CategoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ quiz }) => {
      this.updateForm(quiz);
    });
    this.categoryService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICategory[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICategory[]>) => response.body)
      )
      .subscribe((res: ICategory[]) => (this.categories = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(quiz: IQuiz) {
    this.editForm.patchValue({
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      category: quiz.category
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const quiz = this.createFromForm();
    if (quiz.id !== undefined) {
      this.subscribeToSaveResponse(this.quizService.update(quiz));
    } else {
      this.subscribeToSaveResponse(this.quizService.create(quiz));
    }
  }

  private createFromForm(): IQuiz {
    return {
      ...new Quiz(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      description: this.editForm.get(['description']).value,
      category: this.editForm.get(['category']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuiz>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
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
