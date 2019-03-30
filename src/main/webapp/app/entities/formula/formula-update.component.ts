import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IFormula } from 'app/shared/model/formula.model';
import { FormulaService } from './formula.service';
import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from 'app/entities/category';

@Component({
    selector: 'jhi-formula-update',
    templateUrl: './formula-update.component.html'
})
export class FormulaUpdateComponent implements OnInit {
    formula: IFormula;
    isSaving: boolean;

    categories: ICategory[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected formulaService: FormulaService,
        protected categoryService: CategoryService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ formula }) => {
            this.formula = formula;
        });
        this.categoryService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICategory[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICategory[]>) => response.body)
            )
            .subscribe((res: ICategory[]) => (this.categories = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.formula.id !== undefined) {
            this.subscribeToSaveResponse(this.formulaService.update(this.formula));
        } else {
            this.subscribeToSaveResponse(this.formulaService.create(this.formula));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFormula>>) {
        result.subscribe((res: HttpResponse<IFormula>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCategoryById(index: number, item: ICategory) {
        return item.id;
    }
}
