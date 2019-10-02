import { IQuizQuestion } from 'app/shared/model/quiz-question.model';
import { ICategory } from 'app/shared/model/category.model';

export interface IQuiz {
    id?: number;
    title?: string;
    description?: string;
    questions?: IQuizQuestion[];
    category?: ICategory;
}

export class Quiz implements IQuiz {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public questions?: IQuizQuestion[],
        public category?: ICategory
    ) {}
}
