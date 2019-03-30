import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'category',
                loadChildren: './category/category.module#LearnportalCategoryModule'
            },
            {
                path: 'theory',
                loadChildren: './theory/theory.module#LearnportalTheoryModule'
            },
            {
                path: 'formula',
                loadChildren: './formula/formula.module#LearnportalFormulaModule'
            },
            {
                path: 'deck',
                loadChildren: './deck/deck.module#LearnportalDeckModule'
            },
            {
                path: 'task',
                loadChildren: './task/task.module#LearnportalTaskModule'
            },
            {
                path: 'task-given-data',
                loadChildren: './task-given-data/task-given-data.module#LearnportalTaskGivenDataModule'
            },
            {
                path: 'task-find-data',
                loadChildren: './task-find-data/task-find-data.module#LearnportalTaskFindDataModule'
            },
            {
                path: 'quiz',
                loadChildren: './quiz/quiz.module#LearnportalQuizModule'
            },
            {
                path: 'quiz-question',
                loadChildren: './quiz-question/quiz-question.module#LearnportalQuizQuestionModule'
            },
            {
                path: 'question-answer',
                loadChildren: './question-answer/question-answer.module#LearnportalQuestionAnswerModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LearnportalEntityModule {}
