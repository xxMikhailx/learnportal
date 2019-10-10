import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IQuestionAnswer, QuestionAnswer } from 'app/shared/model/question-answer.model';
import { QuestionAnswerService } from './question-answer.service';
import { IQuizQuestion } from 'app/shared/model/quiz-question.model';
import { QuizQuestionService } from 'app/entities/quiz-question/quiz-question.service';

@Component({
  selector: 'jhi-question-answer-update',
  templateUrl: './question-answer-update.component.html'
})
export class QuestionAnswerUpdateComponent implements OnInit {
  isSaving: boolean;

  quizquestions: IQuizQuestion[];

  editForm = this.fb.group({
    id: [],
    text: [null, [Validators.required]],
    correct: [null, [Validators.required]],
    question: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected questionAnswerService: QuestionAnswerService,
    protected quizQuestionService: QuizQuestionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ questionAnswer }) => {
      this.updateForm(questionAnswer);
    });
    this.quizQuestionService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IQuizQuestion[]>) => mayBeOk.ok),
        map((response: HttpResponse<IQuizQuestion[]>) => response.body)
      )
      .subscribe((res: IQuizQuestion[]) => (this.quizquestions = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(questionAnswer: IQuestionAnswer) {
    this.editForm.patchValue({
      id: questionAnswer.id,
      text: questionAnswer.text,
      correct: questionAnswer.correct,
      question: questionAnswer.question
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const questionAnswer = this.createFromForm();
    if (questionAnswer.id !== undefined) {
      this.subscribeToSaveResponse(this.questionAnswerService.update(questionAnswer));
    } else {
      this.subscribeToSaveResponse(this.questionAnswerService.create(questionAnswer));
    }
  }

  private createFromForm(): IQuestionAnswer {
    return {
      ...new QuestionAnswer(),
      id: this.editForm.get(['id']).value,
      text: this.editForm.get(['text']).value,
      correct: this.editForm.get(['correct']).value,
      question: this.editForm.get(['question']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuestionAnswer>>) {
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

  trackQuizQuestionById(index: number, item: IQuizQuestion) {
    return item.id;
  }
}
