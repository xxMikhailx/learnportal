import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { LearnportalSharedModule } from 'app/shared';
import {
    TaskGivenDataComponent,
    TaskGivenDataDetailComponent,
    TaskGivenDataUpdateComponent,
    TaskGivenDataDeletePopupComponent,
    TaskGivenDataDeleteDialogComponent,
    taskGivenDataRoute,
    taskGivenDataPopupRoute
} from './';

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
    entryComponents: [
        TaskGivenDataComponent,
        TaskGivenDataUpdateComponent,
        TaskGivenDataDeleteDialogComponent,
        TaskGivenDataDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LearnportalTaskGivenDataModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
