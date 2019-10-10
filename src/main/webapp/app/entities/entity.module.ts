import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'category',
        loadChildren: () => import('./category/category.module').then(m => m.LearnportalCategoryModule)
      },
      {
        path: 'theory',
        loadChildren: () => import('./theory/theory.module').then(m => m.LearnportalTheoryModule)
      },
      {
        path: 'formula',
        loadChildren: () => import('./formula/formula.module').then(m => m.LearnportalFormulaModule)
      },
      {
        path: 'deck',
        loadChildren: () => import('./deck/deck.module').then(m => m.LearnportalDeckModule)
      },
      {
        path: 'task',
        loadChildren: () => import('./task/task.module').then(m => m.LearnportalTaskModule)
      },
      {
        path: 'task-given-data',
        loadChildren: () => import('./task-given-data/task-given-data.module').then(m => m.LearnportalTaskGivenDataModule)
      },
      {
        path: 'task-find-data',
        loadChildren: () => import('./task-find-data/task-find-data.module').then(m => m.LearnportalTaskFindDataModule)
      },
      {
        path: 'quiz',
        loadChildren: () => import('./quiz/quiz.module').then(m => m.LearnportalQuizModule)
      },
      {
        path: 'quiz-question',
        loadChildren: () => import('./quiz-question/quiz-question.module').then(m => m.LearnportalQuizQuestionModule)
      },
      {
        path: 'question-answer',
        loadChildren: () => import('./question-answer/question-answer.module').then(m => m.LearnportalQuestionAnswerModule)
      },
      {
        path: 'main-page',
        loadChildren: () => import('./main-page/main-page.module').then(m => m.LearnportalMainPageModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('./contact/contact.module').then(m => m.LearnportalContactModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class LearnportalEntityModule {}
