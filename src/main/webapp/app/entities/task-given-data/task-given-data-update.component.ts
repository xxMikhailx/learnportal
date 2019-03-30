import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITaskGivenData } from 'app/shared/model/task-given-data.model';
import { TaskGivenDataService } from './task-given-data.service';
import { ITask } from 'app/shared/model/task.model';
import { TaskService } from 'app/entities/task';

@Component({
    selector: 'jhi-task-given-data-update',
    templateUrl: './task-given-data-update.component.html'
})
export class TaskGivenDataUpdateComponent implements OnInit {
    taskGivenData: ITaskGivenData;
    isSaving: boolean;

    tasks: ITask[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected taskGivenDataService: TaskGivenDataService,
        protected taskService: TaskService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ taskGivenData }) => {
            this.taskGivenData = taskGivenData;
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
        if (this.taskGivenData.id !== undefined) {
            this.subscribeToSaveResponse(this.taskGivenDataService.update(this.taskGivenData));
        } else {
            this.subscribeToSaveResponse(this.taskGivenDataService.create(this.taskGivenData));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITaskGivenData>>) {
        result.subscribe((res: HttpResponse<ITaskGivenData>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
