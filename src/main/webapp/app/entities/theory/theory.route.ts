import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Theory } from 'app/shared/model/theory.model';
import { TheoryService } from './theory.service';
import { TheoryComponent } from './theory.component';
import { TheoryDetailComponent } from './theory-detail.component';
import { TheoryUpdateComponent } from './theory-update.component';
import { TheoryDeletePopupComponent } from './theory-delete-dialog.component';
import { ITheory } from 'app/shared/model/theory.model';

@Injectable({ providedIn: 'root' })
export class TheoryResolve implements Resolve<ITheory> {
    constructor(private service: TheoryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITheory> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Theory>) => response.ok),
                map((theory: HttpResponse<Theory>) => theory.body)
            );
        }
        return of(new Theory());
    }
}

export const theoryRoute: Routes = [
    {
        path: '',
        component: TheoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'learnportalApp.theory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: TheoryDetailComponent,
        resolve: {
            theory: TheoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'learnportalApp.theory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: TheoryUpdateComponent,
        resolve: {
            theory: TheoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'learnportalApp.theory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: TheoryUpdateComponent,
        resolve: {
            theory: TheoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'learnportalApp.theory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const theoryPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: TheoryDeletePopupComponent,
        resolve: {
            theory: TheoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'learnportalApp.theory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
