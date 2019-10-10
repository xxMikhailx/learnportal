import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LearnportalSharedModule } from 'app/shared/shared.module';
import { MainPageComponent } from './main-page.component';
import { MainPageDetailComponent } from './main-page-detail.component';
import { MainPageUpdateComponent } from './main-page-update.component';
import { MainPageDeletePopupComponent, MainPageDeleteDialogComponent } from './main-page-delete-dialog.component';
import { mainPageRoute, mainPagePopupRoute } from './main-page.route';

const ENTITY_STATES = [...mainPageRoute, ...mainPagePopupRoute];

@NgModule({
  imports: [LearnportalSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MainPageComponent,
    MainPageDetailComponent,
    MainPageUpdateComponent,
    MainPageDeleteDialogComponent,
    MainPageDeletePopupComponent
  ],
  entryComponents: [MainPageDeleteDialogComponent]
})
export class LearnportalMainPageModule {}
