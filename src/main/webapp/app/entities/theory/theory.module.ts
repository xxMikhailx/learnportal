import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { LearnportalSharedModule } from 'app/shared';
import {
    TheoryComponent,
    TheoryDetailComponent,
    TheoryUpdateComponent,
    TheoryDeletePopupComponent,
    TheoryDeleteDialogComponent,
    theoryRoute,
    theoryPopupRoute
} from './';

const ENTITY_STATES = [...theoryRoute, ...theoryPopupRoute];

@NgModule({
    imports: [LearnportalSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [TheoryComponent, TheoryDetailComponent, TheoryUpdateComponent, TheoryDeleteDialogComponent, TheoryDeletePopupComponent],
    entryComponents: [TheoryComponent, TheoryUpdateComponent, TheoryDeleteDialogComponent, TheoryDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LearnportalTheoryModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
