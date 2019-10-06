import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LearnportalSharedModule } from 'app/shared/shared.module';
import { DeckDetailComponent } from './deck-detail.component';
import { DeckUpdateComponent } from './deck-update.component';
import { DeckDeletePopupComponent, DeckDeleteDialogComponent } from './deck-delete-dialog.component';
import { deckRoute, deckPopupRoute } from './deck.route';

const ENTITY_STATES = [...deckRoute, ...deckPopupRoute];

@NgModule({
  imports: [LearnportalSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [DeckDetailComponent, DeckUpdateComponent, DeckDeleteDialogComponent, DeckDeletePopupComponent],
  entryComponents: [DeckDeleteDialogComponent]
})
export class LearnportalDeckModule {}
