import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { LearnportalSharedModule } from 'app/shared';
import {
    QuestionAnswerComponent,
    QuestionAnswerDetailComponent,
    QuestionAnswerUpdateComponent,
    QuestionAnswerDeletePopupComponent,
    QuestionAnswerDeleteDialogComponent,
    questionAnswerRoute,
    questionAnswerPopupRoute
} from './';

const ENTITY_STATES = [...questionAnswerRoute, ...questionAnswerPopupRoute];

@NgModule({
    imports: [LearnportalSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QuestionAnswerComponent,
        QuestionAnswerDetailComponent,
        QuestionAnswerUpdateComponent,
        QuestionAnswerDeleteDialogComponent,
        QuestionAnswerDeletePopupComponent
    ],
    entryComponents: [
        QuestionAnswerComponent,
        QuestionAnswerUpdateComponent,
        QuestionAnswerDeleteDialogComponent,
        QuestionAnswerDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LearnportalQuestionAnswerModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
