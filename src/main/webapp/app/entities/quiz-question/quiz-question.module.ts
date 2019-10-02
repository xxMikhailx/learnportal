import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { LearnportalSharedModule } from 'app/shared';
import {
    QuizQuestionComponent,
    QuizQuestionDetailComponent,
    QuizQuestionUpdateComponent,
    QuizQuestionDeletePopupComponent,
    QuizQuestionDeleteDialogComponent,
    quizQuestionRoute,
    quizQuestionPopupRoute
} from './';

const ENTITY_STATES = [...quizQuestionRoute, ...quizQuestionPopupRoute];

@NgModule({
    imports: [LearnportalSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QuizQuestionComponent,
        QuizQuestionDetailComponent,
        QuizQuestionUpdateComponent,
        QuizQuestionDeleteDialogComponent,
        QuizQuestionDeletePopupComponent
    ],
    entryComponents: [
        QuizQuestionComponent,
        QuizQuestionUpdateComponent,
        QuizQuestionDeleteDialogComponent,
        QuizQuestionDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LearnportalQuizQuestionModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
