import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITaskGivenData } from 'app/shared/model/task-given-data.model';
import { AccountService } from 'app/core';
import { TaskGivenDataService } from './task-given-data.service';

@Component({
    selector: 'jhi-task-given-data',
    templateUrl: './task-given-data.component.html'
})
export class TaskGivenDataComponent implements OnInit, OnDestroy {
    taskGivenData: ITaskGivenData[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected taskGivenDataService: TaskGivenDataService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.taskGivenDataService
            .query()
            .pipe(
                filter((res: HttpResponse<ITaskGivenData[]>) => res.ok),
                map((res: HttpResponse<ITaskGivenData[]>) => res.body)
            )
            .subscribe(
                (res: ITaskGivenData[]) => {
                    this.taskGivenData = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTaskGivenData();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITaskGivenData) {
        return item.id;
    }

    registerChangeInTaskGivenData() {
        this.eventSubscriber = this.eventManager.subscribe('taskGivenDataListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
