import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LearnportalSharedModule } from 'app/shared/shared.module';
import { TheoryDetailComponent } from './theory-detail.component';
import { TheoryUpdateComponent } from './theory-update.component';
import { TheoryDeletePopupComponent, TheoryDeleteDialogComponent } from './theory-delete-dialog.component';
import { theoryRoute, theoryPopupRoute } from './theory.route';

const ENTITY_STATES = [...theoryRoute, ...theoryPopupRoute];

@NgModule({
  imports: [LearnportalSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [TheoryDetailComponent, TheoryUpdateComponent, TheoryDeleteDialogComponent, TheoryDeletePopupComponent],
  entryComponents: [TheoryDeleteDialogComponent]
})
export class LearnportalTheoryModule {}
