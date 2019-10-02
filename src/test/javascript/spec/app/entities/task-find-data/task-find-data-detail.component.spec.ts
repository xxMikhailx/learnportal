/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LearnportalTestModule } from '../../../test.module';
import { TaskFindDataDetailComponent } from 'app/entities/task-find-data/task-find-data-detail.component';
import { TaskFindData } from 'app/shared/model/task-find-data.model';

describe('Component Tests', () => {
    describe('TaskFindData Management Detail Component', () => {
        let comp: TaskFindDataDetailComponent;
        let fixture: ComponentFixture<TaskFindDataDetailComponent>;
        const route = ({ data: of({ taskFindData: new TaskFindData(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LearnportalTestModule],
                declarations: [TaskFindDataDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TaskFindDataDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TaskFindDataDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.taskFindData).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
