import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IMainPage, MainPage } from 'app/shared/model/main-page.model';
import { MainPageService } from './main-page.service';

@Component({
  selector: 'jhi-main-page-update',
  templateUrl: './main-page-update.component.html'
})
export class MainPageUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    content: [null, [Validators.required]],
    motto: [null, [Validators.required]]
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected mainPageService: MainPageService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ mainPage }) => {
      this.updateForm(mainPage);
    });
  }

  updateForm(mainPage: IMainPage) {
    this.editForm.patchValue({
      id: mainPage.id,
      content: mainPage.content,
      motto: mainPage.motto
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
    const mainPage = this.createFromForm();
    if (mainPage.id !== undefined) {
      this.subscribeToSaveResponse(this.mainPageService.update(mainPage));
    } else {
      this.subscribeToSaveResponse(this.mainPageService.create(mainPage));
    }
  }

  private createFromForm(): IMainPage {
    return {
      ...new MainPage(),
      id: this.editForm.get(['id']).value,
      content: this.editForm.get(['content']).value,
      motto: this.editForm.get(['motto']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMainPage>>) {
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
}
