import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDeck } from 'app/shared/model/deck.model';
import { DeckService } from './deck.service';

@Component({
    selector: 'jhi-deck-delete-dialog',
    templateUrl: './deck-delete-dialog.component.html'
})
export class DeckDeleteDialogComponent {
    deck: IDeck;

    constructor(protected deckService: DeckService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.deckService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'deckListModification',
                content: 'Deleted an deck'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-deck-delete-popup',
    template: ''
})
export class DeckDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ deck }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DeckDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.deck = deck;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/deck', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/deck', { outlets: { popup: null } }]);
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
