import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LearnportalTestModule } from '../../../test.module';
import { TaskGivenDataComponent } from 'app/entities/task-given-data/task-given-data.component';
import { TaskGivenDataService } from 'app/entities/task-given-data/task-given-data.service';
import { TaskGivenData } from 'app/shared/model/task-given-data.model';

describe('Component Tests', () => {
  describe('TaskGivenData Management Component', () => {
    let comp: TaskGivenDataComponent;
    let fixture: ComponentFixture<TaskGivenDataComponent>;
    let service: TaskGivenDataService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LearnportalTestModule],
        declarations: [TaskGivenDataComponent],
        providers: []
      })
        .overrideTemplate(TaskGivenDataComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TaskGivenDataComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TaskGivenDataService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TaskGivenData(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.taskGivenData[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
