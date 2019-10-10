import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IMainPage } from 'app/shared/model/main-page.model';

@Component({
  selector: 'jhi-main-page-detail',
  templateUrl: './main-page-detail.component.html'
})
export class MainPageDetailComponent implements OnInit {
  mainPage: IMainPage;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ mainPage }) => {
      this.mainPage = mainPage;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
