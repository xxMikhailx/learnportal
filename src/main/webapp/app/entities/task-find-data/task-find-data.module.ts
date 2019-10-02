import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LearnportalSharedModule } from 'app/shared/shared.module';
import { TaskFindDataComponent } from './task-find-data.component';
import { TaskFindDataDetailComponent } from './task-find-data-detail.component';
import { TaskFindDataUpdateComponent } from './task-find-data-update.component';
import { TaskFindDataDeletePopupComponent, TaskFindDataDeleteDialogComponent } from './task-find-data-delete-dialog.component';
import { taskFindDataRoute, taskFindDataPopupRoute } from './task-find-data.route';

const ENTITY_STATES = [...taskFindDataRoute, ...taskFindDataPopupRoute];

@NgModule({
  imports: [LearnportalSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TaskFindDataComponent,
    TaskFindDataDetailComponent,
    TaskFindDataUpdateComponent,
    TaskFindDataDeleteDialogComponent,
    TaskFindDataDeletePopupComponent
  ],
  entryComponents: [TaskFindDataDeleteDialogComponent]
})
export class LearnportalTaskFindDataModule {}
