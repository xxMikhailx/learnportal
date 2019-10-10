import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITaskGivenData, TaskGivenData } from 'app/shared/model/task-given-data.model';
import { TaskGivenDataService } from './task-given-data.service';
import { ITask } from 'app/shared/model/task.model';
import { TaskService } from 'app/entities/task/task.service';

@Component({
  selector: 'jhi-task-given-data-update',
  templateUrl: './task-given-data-update.component.html'
})
export class TaskGivenDataUpdateComponent implements OnInit {
  isSaving: boolean;

  tasks: ITask[];

  editForm = this.fb.group({
    id: [],
    content: [null, [Validators.required]],
    task: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected taskGivenDataService: TaskGivenDataService,
    protected taskService: TaskService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ taskGivenData }) => {
      this.updateForm(taskGivenData);
    });
    this.taskService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITask[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITask[]>) => response.body)
      )
      .subscribe((res: ITask[]) => (this.tasks = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(taskGivenData: ITaskGivenData) {
    this.editForm.patchValue({
      id: taskGivenData.id,
      content: taskGivenData.content,
      task: taskGivenData.task
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const taskGivenData = this.createFromForm();
    if (taskGivenData.id !== undefined) {
      this.subscribeToSaveResponse(this.taskGivenDataService.update(taskGivenData));
    } else {
      this.subscribeToSaveResponse(this.taskGivenDataService.create(taskGivenData));
    }
  }

  private createFromForm(): ITaskGivenData {
    return {
      ...new TaskGivenData(),
      id: this.editForm.get(['id']).value,
      content: this.editForm.get(['content']).value,
      task: this.editForm.get(['task']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITaskGivenData>>) {
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
