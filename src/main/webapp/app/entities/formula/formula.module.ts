import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { LearnportalSharedModule } from 'app/shared';
import {
    FormulaComponent,
    FormulaDetailComponent,
    FormulaUpdateComponent,
    FormulaDeletePopupComponent,
    FormulaDeleteDialogComponent,
    formulaRoute,
    formulaPopupRoute
} from './';

const ENTITY_STATES = [...formulaRoute, ...formulaPopupRoute];

@NgModule({
    imports: [LearnportalSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FormulaComponent,
        FormulaDetailComponent,
        FormulaUpdateComponent,
        FormulaDeleteDialogComponent,
        FormulaDeletePopupComponent
    ],
    entryComponents: [FormulaComponent, FormulaUpdateComponent, FormulaDeleteDialogComponent, FormulaDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LearnportalFormulaModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
