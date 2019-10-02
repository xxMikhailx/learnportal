import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IQuizQuestion, QuizQuestion } from 'app/shared/model/quiz-question.model';
import { QuizQuestionService } from './quiz-question.service';
import { IQuiz } from 'app/shared/model/quiz.model';
import { QuizService } from 'app/entities/quiz/quiz.service';

@Component({
  selector: 'jhi-quiz-question-update',
  templateUrl: './quiz-question-update.component.html'
})
export class QuizQuestionUpdateComponent implements OnInit {
  isSaving: boolean;

  quizzes: IQuiz[];

  editForm = this.fb.group({
    id: [],
    text: [null, [Validators.required]],
    description: [],
    quiz: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected quizQuestionService: QuizQuestionService,
    protected quizService: QuizService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ quizQuestion }) => {
      this.updateForm(quizQuestion);
    });
    this.quizService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IQuiz[]>) => mayBeOk.ok),
        map((response: HttpResponse<IQuiz[]>) => response.body)
      )
      .subscribe((res: IQuiz[]) => (this.quizzes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(quizQuestion: IQuizQuestion) {
    this.editForm.patchValue({
      id: quizQuestion.id,
      text: quizQuestion.text,
      description: quizQuestion.description,
      quiz: quizQuestion.quiz
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file: File = event.target.files[0];
        if (isImage && !file.type.startsWith('image/')) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      // eslint-disable-next-line no-console
      () => console.log('blob added'), // success
      this.onError
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const quizQuestion = this.createFromForm();
    if (quizQuestion.id !== undefined) {
      this.subscribeToSaveResponse(this.quizQuestionService.update(quizQuestion));
    } else {
      this.subscribeToSaveResponse(this.quizQuestionService.create(quizQuestion));
    }
  }

  private createFromForm(): IQuizQuestion {
    return {
      ...new QuizQuestion(),
      id: this.editForm.get(['id']).value,
      text: this.editForm.get(['text']).value,
      description: this.editForm.get(['description']).value,
      quiz: this.editForm.get(['quiz']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuizQuestion>>) {
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

  trackQuizById(index: number, item: IQuiz) {
    return item.id;
  }
}
