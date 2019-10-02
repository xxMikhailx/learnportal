import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITaskGivenData } from 'app/shared/model/task-given-data.model';
import { TaskGivenDataService } from './task-given-data.service';

@Component({
    selector: 'jhi-task-given-data-delete-dialog',
    templateUrl: './task-given-data-delete-dialog.component.html'
})
export class TaskGivenDataDeleteDialogComponent {
    taskGivenData: ITaskGivenData;

    constructor(
        protected taskGivenDataService: TaskGivenDataService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.taskGivenDataService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'taskGivenDataListModification',
                content: 'Deleted an taskGivenData'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-task-given-data-delete-popup',
    template: ''
})
export class TaskGivenDataDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ taskGivenData }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TaskGivenDataDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.taskGivenData = taskGivenData;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/task-given-data', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/task-given-data', { outlets: { popup: null } }]);
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
