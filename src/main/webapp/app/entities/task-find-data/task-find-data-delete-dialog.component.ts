import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITaskFindData } from 'app/shared/model/task-find-data.model';
import { TaskFindDataService } from './task-find-data.service';

@Component({
  selector: 'jhi-task-find-data-delete-dialog',
  templateUrl: './task-find-data-delete-dialog.component.html'
})
export class TaskFindDataDeleteDialogComponent {
  taskFindData: ITaskFindData;

  constructor(
    protected taskFindDataService: TaskFindDataService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.taskFindDataService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'taskFindDataListModification',
        content: 'Deleted an taskFindData'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-task-find-data-delete-popup',
  template: ''
})
export class TaskFindDataDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ taskFindData }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TaskFindDataDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.taskFindData = taskFindData;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/task-find-data', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/task-find-data', { outlets: { popup: null } }]);
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
