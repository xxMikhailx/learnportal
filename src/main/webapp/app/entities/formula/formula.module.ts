import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LearnportalSharedModule } from 'app/shared/shared.module';
import { FormulaDetailComponent } from './formula-detail.component';
import { FormulaUpdateComponent } from './formula-update.component';
import { FormulaDeletePopupComponent, FormulaDeleteDialogComponent } from './formula-delete-dialog.component';
import { formulaRoute, formulaPopupRoute } from './formula.route';

const ENTITY_STATES = [...formulaRoute, ...formulaPopupRoute];

@NgModule({
  imports: [LearnportalSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [FormulaDetailComponent, FormulaUpdateComponent, FormulaDeleteDialogComponent, FormulaDeletePopupComponent],
  entryComponents: [FormulaDeleteDialogComponent]
})
export class LearnportalFormulaModule {}
