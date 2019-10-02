import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITaskFindData, TaskFindData } from 'app/shared/model/task-find-data.model';
import { TaskFindDataService } from './task-find-data.service';
import { ITask } from 'app/shared/model/task.model';
import { TaskService } from 'app/entities/task/task.service';

@Component({
  selector: 'jhi-task-find-data-update',
  templateUrl: './task-find-data-update.component.html'
})
export class TaskFindDataUpdateComponent implements OnInit {
  isSaving: boolean;

  tasks: ITask[];

  editForm = this.fb.group({
    id: [],
    content: [null, [Validators.required]],
    task: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected taskFindDataService: TaskFindDataService,
    protected taskService: TaskService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ taskFindData }) => {
      this.updateForm(taskFindData);
    });
    this.taskService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITask[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITask[]>) => response.body)
      )
      .subscribe((res: ITask[]) => (this.tasks = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(taskFindData: ITaskFindData) {
    this.editForm.patchValue({
      id: taskFindData.id,
      content: taskFindData.content,
      task: taskFindData.task
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const taskFindData = this.createFromForm();
    if (taskFindData.id !== undefined) {
      this.subscribeToSaveResponse(this.taskFindDataService.update(taskFindData));
    } else {
      this.subscribeToSaveResponse(this.taskFindDataService.create(taskFindData));
    }
  }

  private createFromForm(): ITaskFindData {
    return {
      ...new TaskFindData(),
      id: this.editForm.get(['id']).value,
      content: this.editForm.get(['content']).value,
      task: this.editForm.get(['task']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITaskFindData>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
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
