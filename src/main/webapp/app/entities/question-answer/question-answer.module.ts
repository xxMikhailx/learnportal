import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LearnportalSharedModule } from 'app/shared/shared.module';
import { QuestionAnswerComponent } from './question-answer.component';
import { QuestionAnswerDetailComponent } from './question-answer-detail.component';
import { QuestionAnswerUpdateComponent } from './question-answer-update.component';
import { QuestionAnswerDeletePopupComponent, QuestionAnswerDeleteDialogComponent } from './question-answer-delete-dialog.component';
import { questionAnswerRoute, questionAnswerPopupRoute } from './question-answer.route';

const ENTITY_STATES = [...questionAnswerRoute, ...questionAnswerPopupRoute];

@NgModule({
  imports: [LearnportalSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    QuestionAnswerComponent,
    QuestionAnswerDetailComponent,
    QuestionAnswerUpdateComponent,
    QuestionAnswerDeleteDialogComponent,
    QuestionAnswerDeletePopupComponent
  ],
  entryComponents: [QuestionAnswerDeleteDialogComponent]
})
export class LearnportalQuestionAnswerModule {}
