import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QuizQuestion } from 'app/shared/model/quiz-question.model';
import { QuizQuestionService } from './quiz-question.service';
import { QuizQuestionComponent } from './quiz-question.component';
import { QuizQuestionDetailComponent } from './quiz-question-detail.component';
import { QuizQuestionUpdateComponent } from './quiz-question-update.component';
import { QuizQuestionDeletePopupComponent } from './quiz-question-delete-dialog.component';
import { IQuizQuestion } from 'app/shared/model/quiz-question.model';

@Injectable({ providedIn: 'root' })
export class QuizQuestionResolve implements Resolve<IQuizQuestion> {
  constructor(private service: QuizQuestionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IQuizQuestion> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<QuizQuestion>) => response.ok),
        map((quizQuestion: HttpResponse<QuizQuestion>) => quizQuestion.body)
      );
    }
    return of(new QuizQuestion());
  }
}

export const quizQuestionRoute: Routes = [
  {
    path: '',
    component: QuizQuestionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'learnportalApp.quizQuestion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: QuizQuestionDetailComponent,
    resolve: {
      quizQuestion: QuizQuestionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'learnportalApp.quizQuestion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: QuizQuestionUpdateComponent,
    resolve: {
      quizQuestion: QuizQuestionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'learnportalApp.quizQuestion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: QuizQuestionUpdateComponent,
    resolve: {
      quizQuestion: QuizQuestionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'learnportalApp.quizQuestion.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const quizQuestionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: QuizQuestionDeletePopupComponent,
    resolve: {
      quizQuestion: QuizQuestionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'learnportalApp.quizQuestion.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
