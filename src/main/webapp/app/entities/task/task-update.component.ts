import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ITask, Task } from 'app/shared/model/task.model';
import { TaskService } from './task.service';
import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from 'app/entities/category/category.service';

@Component({
  selector: 'jhi-task-update',
  templateUrl: './task-update.component.html'
})
export class TaskUpdateComponent implements OnInit {
  isSaving: boolean;

  categories: ICategory[];

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    shortDescription: [],
    taskDescription: [null, [Validators.required]],
    solution: [null, [Validators.required]],
    category: [null, Validators.required]
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected taskService: TaskService,
    protected categoryService: CategoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ task }) => {
      this.updateForm(task);
    });
    this.categoryService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICategory[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICategory[]>) => response.body)
      )
      .subscribe((res: ICategory[]) => (this.categories = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(task: ITask) {
    this.editForm.patchValue({
      id: task.id,
      title: task.title,
      shortDescription: task.shortDescription,
      taskDescription: task.taskDescription,
      solution: task.solution,
      category: task.category
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file: File = event.target.files[0];
        if (isImage && !file.type.startsWith('image/')) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      // eslint-disable-next-line no-console
      () => console.log('blob added'), // success
      this.onError
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const task = this.createFromForm();
    if (task.id !== undefined) {
      this.subscribeToSaveResponse(this.taskService.update(task));
    } else {
      this.subscribeToSaveResponse(this.taskService.create(task));
    }
  }

  private createFromForm(): ITask {
    return {
      ...new Task(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      shortDescription: this.editForm.get(['shortDescription']).value,
      taskDescription: this.editForm.get(['taskDescription']).value,
      solution: this.editForm.get(['solution']).value,
      category: this.editForm.get(['category']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITask>>) {
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

  trackCategoryById(index: number, item: ICategory) {
    return item.id;
  }
}
