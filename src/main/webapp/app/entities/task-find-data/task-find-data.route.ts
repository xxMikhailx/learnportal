import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TaskFindData } from 'app/shared/model/task-find-data.model';
import { TaskFindDataService } from './task-find-data.service';
import { TaskFindDataComponent } from './task-find-data.component';
import { TaskFindDataDetailComponent } from './task-find-data-detail.component';
import { TaskFindDataUpdateComponent } from './task-find-data-update.component';
import { TaskFindDataDeletePopupComponent } from './task-find-data-delete-dialog.component';
import { ITaskFindData } from 'app/shared/model/task-find-data.model';

@Injectable({ providedIn: 'root' })
export class TaskFindDataResolve implements Resolve<ITaskFindData> {
    constructor(private service: TaskFindDataService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITaskFindData> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TaskFindData>) => response.ok),
                map((taskFindData: HttpResponse<TaskFindData>) => taskFindData.body)
            );
        }
        return of(new TaskFindData());
    }
}

export const taskFindDataRoute: Routes = [
    {
        path: '',
        component: TaskFindDataComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'learnportalApp.taskFindData.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: TaskFindDataDetailComponent,
        resolve: {
            taskFindData: TaskFindDataResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'learnportalApp.taskFindData.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: TaskFindDataUpdateComponent,
        resolve: {
            taskFindData: TaskFindDataResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'learnportalApp.taskFindData.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: TaskFindDataUpdateComponent,
        resolve: {
            taskFindData: TaskFindDataResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'learnportalApp.taskFindData.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const taskFindDataPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: TaskFindDataDeletePopupComponent,
        resolve: {
            taskFindData: TaskFindDataResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'learnportalApp.taskFindData.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
