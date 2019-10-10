import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMainPage } from 'app/shared/model/main-page.model';
import { MainPageService } from './main-page.service';

@Component({
  selector: 'jhi-main-page-delete-dialog',
  templateUrl: './main-page-delete-dialog.component.html'
})
export class MainPageDeleteDialogComponent {
  mainPage: IMainPage;

  constructor(protected mainPageService: MainPageService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.mainPageService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'mainPageListModification',
        content: 'Deleted an mainPage'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-main-page-delete-popup',
  template: ''
})
export class MainPageDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ mainPage }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MainPageDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.mainPage = mainPage;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/main-page', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/main-page', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
