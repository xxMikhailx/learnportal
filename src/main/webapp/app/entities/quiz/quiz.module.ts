import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LearnportalSharedModule } from 'app/shared/shared.module';
import { QuizDetailComponent } from './quiz-detail.component';
import { QuizUpdateComponent } from './quiz-update.component';
import { QuizDeletePopupComponent, QuizDeleteDialogComponent } from './quiz-delete-dialog.component';
import { quizRoute, quizPopupRoute } from './quiz.route';

const ENTITY_STATES = [...quizRoute, ...quizPopupRoute];

@NgModule({
  imports: [LearnportalSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [QuizDetailComponent, QuizUpdateComponent, QuizDeleteDialogComponent, QuizDeletePopupComponent],
  entryComponents: [QuizDeleteDialogComponent]
})
export class LearnportalQuizModule {}
