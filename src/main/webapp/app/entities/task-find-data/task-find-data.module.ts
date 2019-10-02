import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { LearnportalSharedModule } from 'app/shared';
import {
    TaskFindDataComponent,
    TaskFindDataDetailComponent,
    TaskFindDataUpdateComponent,
    TaskFindDataDeletePopupComponent,
    TaskFindDataDeleteDialogComponent,
    taskFindDataRoute,
    taskFindDataPopupRoute
} from './';

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
    entryComponents: [
        TaskFindDataComponent,
        TaskFindDataUpdateComponent,
        TaskFindDataDeleteDialogComponent,
        TaskFindDataDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LearnportalTaskFindDataModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
