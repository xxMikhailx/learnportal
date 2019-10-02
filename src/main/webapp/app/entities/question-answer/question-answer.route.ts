import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QuestionAnswer } from 'app/shared/model/question-answer.model';
import { QuestionAnswerService } from './question-answer.service';
import { QuestionAnswerComponent } from './question-answer.component';
import { QuestionAnswerDetailComponent } from './question-answer-detail.component';
import { QuestionAnswerUpdateComponent } from './question-answer-update.component';
import { QuestionAnswerDeletePopupComponent } from './question-answer-delete-dialog.component';
import { IQuestionAnswer } from 'app/shared/model/question-answer.model';

@Injectable({ providedIn: 'root' })
export class QuestionAnswerResolve implements Resolve<IQuestionAnswer> {
    constructor(private service: QuestionAnswerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IQuestionAnswer> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QuestionAnswer>) => response.ok),
                map((questionAnswer: HttpResponse<QuestionAnswer>) => questionAnswer.body)
            );
        }
        return of(new QuestionAnswer());
    }
}

export const questionAnswerRoute: Routes = [
    {
        path: '',
        component: QuestionAnswerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'learnportalApp.questionAnswer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: QuestionAnswerDetailComponent,
        resolve: {
            questionAnswer: QuestionAnswerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'learnportalApp.questionAnswer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: QuestionAnswerUpdateComponent,
        resolve: {
            questionAnswer: QuestionAnswerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'learnportalApp.questionAnswer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: QuestionAnswerUpdateComponent,
        resolve: {
            questionAnswer: QuestionAnswerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'learnportalApp.questionAnswer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const questionAnswerPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: QuestionAnswerDeletePopupComponent,
        resolve: {
            questionAnswer: QuestionAnswerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'learnportalApp.questionAnswer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
