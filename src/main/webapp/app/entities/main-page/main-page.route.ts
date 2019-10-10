import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MainPage } from 'app/shared/model/main-page.model';
import { MainPageService } from './main-page.service';
import { MainPageComponent } from './main-page.component';
import { MainPageDetailComponent } from './main-page-detail.component';
import { MainPageUpdateComponent } from './main-page-update.component';
import { MainPageDeletePopupComponent } from './main-page-delete-dialog.component';
import { IMainPage } from 'app/shared/model/main-page.model';

@Injectable({ providedIn: 'root' })
export class MainPageResolve implements Resolve<IMainPage> {
  constructor(private service: MainPageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMainPage> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MainPage>) => response.ok),
        map((mainPage: HttpResponse<MainPage>) => mainPage.body)
      );
    }
    return of(new MainPage());
  }
}

export const mainPageRoute: Routes = [
  {
    path: '',
    component: MainPageComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'learnportalApp.mainPage.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MainPageDetailComponent,
    resolve: {
      mainPage: MainPageResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'learnportalApp.mainPage.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MainPageUpdateComponent,
    resolve: {
      mainPage: MainPageResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'learnportalApp.mainPage.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MainPageUpdateComponent,
    resolve: {
      mainPage: MainPageResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'learnportalApp.mainPage.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const mainPagePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MainPageDeletePopupComponent,
    resolve: {
      mainPage: MainPageResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'learnportalApp.mainPage.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
