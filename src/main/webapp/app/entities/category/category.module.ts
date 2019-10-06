import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LearnportalSharedModule } from 'app/shared/shared.module';
import { CategoryDetailComponent } from './category-detail.component';
import { CategoryUpdateComponent } from './category-update.component';
import { CategoryDeletePopupComponent, CategoryDeleteDialogComponent } from './category-delete-dialog.component';
import { categoryRoute, categoryPopupRoute } from './category.route';

const ENTITY_STATES = [...categoryRoute, ...categoryPopupRoute];

@NgModule({
  imports: [LearnportalSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [CategoryDetailComponent, CategoryUpdateComponent, CategoryDeleteDialogComponent, CategoryDeletePopupComponent],
  entryComponents: [CategoryDeleteDialogComponent]
})
export class LearnportalCategoryModule {}
