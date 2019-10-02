import { ITheory } from 'app/shared/model/theory.model';
import { IFormula } from 'app/shared/model/formula.model';
import { IDeck } from 'app/shared/model/deck.model';
import { ITask } from 'app/shared/model/task.model';
import { IQuiz } from 'app/shared/model/quiz.model';

export interface ICategory {
    id?: number;
    shortName?: string;
    fullName?: string;
    theories?: ITheory[];
    formulas?: IFormula[];
    decks?: IDeck[];
    tasks?: ITask[];
    quizzes?: IQuiz[];
}

export class Category implements ICategory {
    constructor(
        public id?: number,
        public shortName?: string,
        public fullName?: string,
        public theories?: ITheory[],
        public formulas?: IFormula[],
        public decks?: IDeck[],
        public tasks?: ITask[],
        public quizzes?: IQuiz[]
    ) {}
}
