import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Category } from 'app/shared/model/category.model';
import { CategoryService } from './category.service';
import { CategoryComponent } from './category.component';
import { CategoryDetailComponent } from './category-detail.component';
import { CategoryUpdateComponent } from './category-update.component';
import { CategoryDeletePopupComponent } from './category-delete-dialog.component';
import { ICategory } from 'app/shared/model/category.model';
import { TheoryComponent } from 'app/entities/theory/theory.component';
import { FormulaComponent } from 'app/entities/formula/formula.component';
import { QuizComponent } from 'app/entities/quiz/quiz.component';
import { TaskComponent } from 'app/entities/task/task.component';
import { DeckComponent } from 'app/entities/deck/deck.component';

@Injectable({ providedIn: 'root' })
export class CategoryResolve implements Resolve<ICategory> {
  constructor(private service: CategoryService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICategory> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Category>) => response.ok),
        map((category: HttpResponse<Category>) => category.body)
      );
    }
    return of(new Category());
  }
}

export const categoryRoute: Routes = [
  {
    path: '',
    component: CategoryComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'learnportalApp.category.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CategoryDetailComponent,
    resolve: {
      category: CategoryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'learnportalApp.category.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CategoryUpdateComponent,
    resolve: {
      category: CategoryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'learnportalApp.category.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CategoryUpdateComponent,
    resolve: {
      category: CategoryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'learnportalApp.category.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/theory',
    component: TheoryComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'learnportalApp.theory.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/formula',
    component: FormulaComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'learnportalApp.formula.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/quiz',
    component: QuizComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'learnportalApp.quiz.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/task',
    component: TaskComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'learnportalApp.task.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/deck',
    component: DeckComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'learnportalApp.deck.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const categoryPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CategoryDeletePopupComponent,
    resolve: {
      category: CategoryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'learnportalApp.category.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
