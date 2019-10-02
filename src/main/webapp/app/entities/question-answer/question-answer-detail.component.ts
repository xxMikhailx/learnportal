import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQuestionAnswer } from 'app/shared/model/question-answer.model';

@Component({
    selector: 'jhi-question-answer-detail',
    templateUrl: './question-answer-detail.component.html'
})
export class QuestionAnswerDetailComponent implements OnInit {
    questionAnswer: IQuestionAnswer;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ questionAnswer }) => {
            this.questionAnswer = questionAnswer;
        });
    }

    previousState() {
        window.history.back();
    }
}
