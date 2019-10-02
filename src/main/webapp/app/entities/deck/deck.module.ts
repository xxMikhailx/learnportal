import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { LearnportalSharedModule } from 'app/shared';
import {
    DeckComponent,
    DeckDetailComponent,
    DeckUpdateComponent,
    DeckDeletePopupComponent,
    DeckDeleteDialogComponent,
    deckRoute,
    deckPopupRoute
} from './';

const ENTITY_STATES = [...deckRoute, ...deckPopupRoute];

@NgModule({
    imports: [LearnportalSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [DeckComponent, DeckDetailComponent, DeckUpdateComponent, DeckDeleteDialogComponent, DeckDeletePopupComponent],
    entryComponents: [DeckComponent, DeckUpdateComponent, DeckDeleteDialogComponent, DeckDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LearnportalDeckModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
