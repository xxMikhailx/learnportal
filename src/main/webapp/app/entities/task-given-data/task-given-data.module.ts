import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LearnportalSharedModule } from 'app/shared/shared.module';
import { TaskGivenDataComponent } from './task-given-data.component';
import { TaskGivenDataDetailComponent } from './task-given-data-detail.component';
import { TaskGivenDataUpdateComponent } from './task-given-data-update.component';
import { TaskGivenDataDeletePopupComponent, TaskGivenDataDeleteDialogComponent } from './task-given-data-delete-dialog.component';
import { taskGivenDataRoute, taskGivenDataPopupRoute } from './task-given-data.route';

const ENTITY_STATES = [...taskGivenDataRoute, ...taskGivenDataPopupRoute];

@NgModule({
  imports: [LearnportalSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TaskGivenDataComponent,
    TaskGivenDataDetailComponent,
    TaskGivenDataUpdateComponent,
    TaskGivenDataDeleteDialogComponent,
    TaskGivenDataDeletePopupComponent
  ],
  entryComponents: [TaskGivenDataDeleteDialogComponent]
})
export class LearnportalTaskGivenDataModule {}
