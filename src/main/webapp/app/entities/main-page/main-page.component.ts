import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IMainPage } from 'app/shared/model/main-page.model';
import { AccountService } from 'app/core/auth/account.service';
import { MainPageService } from './main-page.service';

@Component({
  selector: 'jhi-main-page',
  templateUrl: './main-page.component.html'
})
export class MainPageComponent implements OnInit, OnDestroy {
  mainPages: IMainPage[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected mainPageService: MainPageService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.mainPageService
      .query()
      .pipe(
        filter((res: HttpResponse<IMainPage[]>) => res.ok),
        map((res: HttpResponse<IMainPage[]>) => res.body)
      )
      .subscribe(
        (res: IMainPage[]) => {
          this.mainPages = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInMainPages();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMainPage) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInMainPages() {
    this.eventSubscriber = this.eventManager.subscribe('mainPageListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
