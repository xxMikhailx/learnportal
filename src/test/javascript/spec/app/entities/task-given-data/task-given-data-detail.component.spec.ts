import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LearnportalTestModule } from '../../../test.module';
import { TaskGivenDataDetailComponent } from 'app/entities/task-given-data/task-given-data-detail.component';
import { TaskGivenData } from 'app/shared/model/task-given-data.model';

describe('Component Tests', () => {
  describe('TaskGivenData Management Detail Component', () => {
    let comp: TaskGivenDataDetailComponent;
    let fixture: ComponentFixture<TaskGivenDataDetailComponent>;
    const route = ({ data: of({ taskGivenData: new TaskGivenData(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LearnportalTestModule],
        declarations: [TaskGivenDataDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TaskGivenDataDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TaskGivenDataDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.taskGivenData).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
