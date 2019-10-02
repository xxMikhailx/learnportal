import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LearnportalSharedModule } from 'app/shared/shared.module';
import { QuizQuestionComponent } from './quiz-question.component';
import { QuizQuestionDetailComponent } from './quiz-question-detail.component';
import { QuizQuestionUpdateComponent } from './quiz-question-update.component';
import { QuizQuestionDeletePopupComponent, QuizQuestionDeleteDialogComponent } from './quiz-question-delete-dialog.component';
import { quizQuestionRoute, quizQuestionPopupRoute } from './quiz-question.route';

const ENTITY_STATES = [...quizQuestionRoute, ...quizQuestionPopupRoute];

@NgModule({
  imports: [LearnportalSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    QuizQuestionComponent,
    QuizQuestionDetailComponent,
    QuizQuestionUpdateComponent,
    QuizQuestionDeleteDialogComponent,
    QuizQuestionDeletePopupComponent
  ],
  entryComponents: [QuizQuestionDeleteDialogComponent]
})
export class LearnportalQuizQuestionModule {}
