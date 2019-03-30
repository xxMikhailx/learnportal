/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LearnportalTestModule } from '../../../test.module';
import { TaskGivenDataUpdateComponent } from 'app/entities/task-given-data/task-given-data-update.component';
import { TaskGivenDataService } from 'app/entities/task-given-data/task-given-data.service';
import { TaskGivenData } from 'app/shared/model/task-given-data.model';

describe('Component Tests', () => {
    describe('TaskGivenData Management Update Component', () => {
        let comp: TaskGivenDataUpdateComponent;
        let fixture: ComponentFixture<TaskGivenDataUpdateComponent>;
        let service: TaskGivenDataService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LearnportalTestModule],
                declarations: [TaskGivenDataUpdateComponent]
            })
                .overrideTemplate(TaskGivenDataUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TaskGivenDataUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaskGivenDataService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new TaskGivenData(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.taskGivenData = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new TaskGivenData();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.taskGivenData = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
