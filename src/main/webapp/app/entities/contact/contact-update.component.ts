import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IContact, Contact } from 'app/shared/model/contact.model';
import { ContactService } from './contact.service';
import { IMainPage } from 'app/shared/model/main-page.model';
import { MainPageService } from 'app/entities/main-page/main-page.service';

@Component({
  selector: 'jhi-contact-update',
  templateUrl: './contact-update.component.html'
})
export class ContactUpdateComponent implements OnInit {
  isSaving: boolean;

  mainpages: IMainPage[];

  editForm = this.fb.group({
    id: [],
    text: [null, [Validators.required]],
    description: [],
    contactType: [],
    mainPage: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected contactService: ContactService,
    protected mainPageService: MainPageService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ contact }) => {
      this.updateForm(contact);
    });
    this.mainPageService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMainPage[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMainPage[]>) => response.body)
      )
      .subscribe((res: IMainPage[]) => (this.mainpages = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(contact: IContact) {
    this.editForm.patchValue({
      id: contact.id,
      text: contact.text,
      description: contact.description,
      contactType: contact.contactType,
      mainPage: contact.mainPage
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const contact = this.createFromForm();
    if (contact.id !== undefined) {
      this.subscribeToSaveResponse(this.contactService.update(contact));
    } else {
      this.subscribeToSaveResponse(this.contactService.create(contact));
    }
  }

  private createFromForm(): IContact {
    return {
      ...new Contact(),
      id: this.editForm.get(['id']).value,
      text: this.editForm.get(['text']).value,
      description: this.editForm.get(['description']).value,
      contactType: this.editForm.get(['contactType']).value,
      mainPage: this.editForm.get(['mainPage']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContact>>) {
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

  trackMainPageById(index: number, item: IMainPage) {
    return item.id;
  }
}
