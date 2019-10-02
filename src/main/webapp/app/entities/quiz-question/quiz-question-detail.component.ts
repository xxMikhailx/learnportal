import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IQuizQuestion } from 'app/shared/model/quiz-question.model';

@Component({
  selector: 'jhi-quiz-question-detail',
  templateUrl: './quiz-question-detail.component.html'
})
export class QuizQuestionDetailComponent implements OnInit {
  quizQuestion: IQuizQuestion;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ quizQuestion }) => {
      this.quizQuestion = quizQuestion;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
