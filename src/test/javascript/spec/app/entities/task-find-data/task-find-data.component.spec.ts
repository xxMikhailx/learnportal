/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LearnportalTestModule } from '../../../test.module';
import { TaskFindDataComponent } from 'app/entities/task-find-data/task-find-data.component';
import { TaskFindDataService } from 'app/entities/task-find-data/task-find-data.service';
import { TaskFindData } from 'app/shared/model/task-find-data.model';

describe('Component Tests', () => {
    describe('TaskFindData Management Component', () => {
        let comp: TaskFindDataComponent;
        let fixture: ComponentFixture<TaskFindDataComponent>;
        let service: TaskFindDataService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LearnportalTestModule],
                declarations: [TaskFindDataComponent],
                providers: []
            })
                .overrideTemplate(TaskFindDataComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TaskFindDataComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaskFindDataService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TaskFindData(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.taskFindData[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
