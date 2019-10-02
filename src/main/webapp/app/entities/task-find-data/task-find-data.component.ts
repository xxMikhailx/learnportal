import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITaskFindData } from 'app/shared/model/task-find-data.model';
import { AccountService } from 'app/core';
import { TaskFindDataService } from './task-find-data.service';

@Component({
    selector: 'jhi-task-find-data',
    templateUrl: './task-find-data.component.html'
})
export class TaskFindDataComponent implements OnInit, OnDestroy {
    taskFindData: ITaskFindData[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected taskFindDataService: TaskFindDataService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.taskFindDataService
            .query()
            .pipe(
                filter((res: HttpResponse<ITaskFindData[]>) => res.ok),
                map((res: HttpResponse<ITaskFindData[]>) => res.body)
            )
            .subscribe(
                (res: ITaskFindData[]) => {
                    this.taskFindData = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTaskFindData();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITaskFindData) {
        return item.id;
    }

    registerChangeInTaskFindData() {
        this.eventSubscriber = this.eventManager.subscribe('taskFindDataListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
