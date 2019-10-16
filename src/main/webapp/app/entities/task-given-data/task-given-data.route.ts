import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TaskGivenData } from 'app/shared/model/task-given-data.model';
import { TaskGivenDataService } from './task-given-data.service';
import { TaskGivenDataComponent } from './task-given-data.component';
import { TaskGivenDataDetailComponent } from './task-given-data-detail.component';
import { TaskGivenDataUpdateComponent } from './task-given-data-update.component';
import { TaskGivenDataDeletePopupComponent } from './task-given-data-delete-dialog.component';
import { ITaskGivenData } from 'app/shared/model/task-given-data.model';

@Injectable({ providedIn: 'root' })
export class TaskGivenDataResolve implements Resolve<ITaskGivenData> {
  constructor(private service: TaskGivenDataService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITaskGivenData> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TaskGivenData>) => response.ok),
        map((taskGivenData: HttpResponse<TaskGivenData>) => taskGivenData.body)
      );
    }
    return of(new TaskGivenData());
  }
}

export const taskGivenDataRoute: Routes = [
  {
    path: '',
    component: TaskGivenDataComponent,
    data: {
      authorities: [],
      pageTitle: 'learnportalApp.taskGivenData.home.title'
    }
  },
  {
    path: ':id/view',
    component: TaskGivenDataDetailComponent,
    resolve: {
      taskGivenData: TaskGivenDataResolve
    },
    data: {
      authorities: [],
      pageTitle: 'learnportalApp.taskGivenData.home.title'
    }
  },
  {
    path: 'new',
    component: TaskGivenDataUpdateComponent,
    resolve: {
      taskGivenData: TaskGivenDataResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'learnportalApp.taskGivenData.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TaskGivenDataUpdateComponent,
    resolve: {
      taskGivenData: TaskGivenDataResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'learnportalApp.taskGivenData.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const taskGivenDataPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TaskGivenDataDeletePopupComponent,
    resolve: {
      taskGivenData: TaskGivenDataResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'learnportalApp.taskGivenData.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
