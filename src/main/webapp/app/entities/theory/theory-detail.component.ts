import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ITheory } from 'app/shared/model/theory.model';

@Component({
    selector: 'jhi-theory-detail',
    templateUrl: './theory-detail.component.html'
})
export class TheoryDetailComponent implements OnInit {
    theory: ITheory;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ theory }) => {
            this.theory = theory;
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
