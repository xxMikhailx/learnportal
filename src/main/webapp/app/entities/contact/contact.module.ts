import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LearnportalSharedModule } from 'app/shared/shared.module';
import { ContactComponent } from './contact.component';
import { ContactDetailComponent } from './contact-detail.component';
import { ContactUpdateComponent } from './contact-update.component';
import { ContactDeletePopupComponent, ContactDeleteDialogComponent } from './contact-delete-dialog.component';
import { contactRoute, contactPopupRoute } from './contact.route';

const ENTITY_STATES = [...contactRoute, ...contactPopupRoute];

@NgModule({
  imports: [LearnportalSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ContactComponent,
    ContactDetailComponent,
    ContactUpdateComponent,
    ContactDeleteDialogComponent,
    ContactDeletePopupComponent
  ],
  entryComponents: [ContactDeleteDialogComponent]
})
export class LearnportalContactModule {}
