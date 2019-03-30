/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LearnportalTestModule } from '../../../test.module';
import { TaskFindDataUpdateComponent } from 'app/entities/task-find-data/task-find-data-update.component';
import { TaskFindDataService } from 'app/entities/task-find-data/task-find-data.service';
import { TaskFindData } from 'app/shared/model/task-find-data.model';

describe('Component Tests', () => {
    describe('TaskFindData Management Update Component', () => {
        let comp: TaskFindDataUpdateComponent;
        let fixture: ComponentFixture<TaskFindDataUpdateComponent>;
        let service: TaskFindDataService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LearnportalTestModule],
                declarations: [TaskFindDataUpdateComponent]
            })
                .overrideTemplate(TaskFindDataUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TaskFindDataUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaskFindDataService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new TaskFindData(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.taskFindData = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new TaskFindData();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.taskFindData = entity;
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
