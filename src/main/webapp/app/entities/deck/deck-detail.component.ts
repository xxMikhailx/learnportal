import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IDeck } from 'app/shared/model/deck.model';

@Component({
    selector: 'jhi-deck-detail',
    templateUrl: './deck-detail.component.html'
})
export class DeckDetailComponent implements OnInit {
    deck: IDeck;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ deck }) => {
            this.deck = deck;
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
