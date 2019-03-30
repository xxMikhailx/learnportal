import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITheory } from 'app/shared/model/theory.model';
import { TheoryService } from './theory.service';

@Component({
    selector: 'jhi-theory-delete-dialog',
    templateUrl: './theory-delete-dialog.component.html'
})
export class TheoryDeleteDialogComponent {
    theory: ITheory;

    constructor(protected theoryService: TheoryService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.theoryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'theoryListModification',
                content: 'Deleted an theory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-theory-delete-popup',
    template: ''
})
export class TheoryDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ theory }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TheoryDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.theory = theory;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/theory', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/theory', { outlets: { popup: null } }]);
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
