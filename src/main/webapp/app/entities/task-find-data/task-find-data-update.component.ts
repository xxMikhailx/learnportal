import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITaskFindData } from 'app/shared/model/task-find-data.model';
import { TaskFindDataService } from './task-find-data.service';
import { ITask } from 'app/shared/model/task.model';
import { TaskService } from 'app/entities/task';

@Component({
    selector: 'jhi-task-find-data-update',
    templateUrl: './task-find-data-update.component.html'
})
export class TaskFindDataUpdateComponent implements OnInit {
    taskFindData: ITaskFindData;
    isSaving: boolean;

    tasks: ITask[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected taskFindDataService: TaskFindDataService,
        protected taskService: TaskService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ taskFindData }) => {
            this.taskFindData = taskFindData;
        });
        this.taskService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ITask[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITask[]>) => response.body)
            )
            .subscribe((res: ITask[]) => (this.tasks = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.taskFindData.id !== undefined) {
            this.subscribeToSaveResponse(this.taskFindDataService.update(this.taskFindData));
        } else {
            this.subscribeToSaveResponse(this.taskFindDataService.create(this.taskFindData));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITaskFindData>>) {
        result.subscribe((res: HttpResponse<ITaskFindData>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackTaskById(index: number, item: ITask) {
        return item.id;
    }
}
