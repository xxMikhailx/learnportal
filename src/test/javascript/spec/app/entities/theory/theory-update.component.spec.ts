/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LearnportalTestModule } from '../../../test.module';
import { TheoryUpdateComponent } from 'app/entities/theory/theory-update.component';
import { TheoryService } from 'app/entities/theory/theory.service';
import { Theory } from 'app/shared/model/theory.model';

describe('Component Tests', () => {
    describe('Theory Management Update Component', () => {
        let comp: TheoryUpdateComponent;
        let fixture: ComponentFixture<TheoryUpdateComponent>;
        let service: TheoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LearnportalTestModule],
                declarations: [TheoryUpdateComponent]
            })
                .overrideTemplate(TheoryUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TheoryUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TheoryService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Theory(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.theory = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Theory();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.theory = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
