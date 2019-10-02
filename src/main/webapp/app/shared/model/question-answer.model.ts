import { IQuizQuestion } from 'app/shared/model/quiz-question.model';

export interface IQuestionAnswer {
    id?: number;
    text?: string;
    correct?: boolean;
    question?: IQuizQuestion;
}

export class QuestionAnswer implements IQuestionAnswer {
    constructor(public id?: number, public text?: string, public correct?: boolean, public question?: IQuizQuestion) {
        this.correct = this.correct || false;
    }
}
