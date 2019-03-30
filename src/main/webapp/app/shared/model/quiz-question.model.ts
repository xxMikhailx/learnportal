import { IQuestionAnswer } from 'app/shared/model/question-answer.model';
import { IQuiz } from 'app/shared/model/quiz.model';

export interface IQuizQuestion {
    id?: number;
    text?: string;
    description?: any;
    answers?: IQuestionAnswer[];
    quiz?: IQuiz;
}

export class QuizQuestion implements IQuizQuestion {
    constructor(
        public id?: number,
        public text?: string,
        public description?: any,
        public answers?: IQuestionAnswer[],
        public quiz?: IQuiz
    ) {}
}
