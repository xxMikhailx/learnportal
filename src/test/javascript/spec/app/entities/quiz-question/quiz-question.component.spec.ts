import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LearnportalTestModule } from '../../../test.module';
import { QuizQuestionComponent } from 'app/entities/quiz-question/quiz-question.component';
import { QuizQuestionService } from 'app/entities/quiz-question/quiz-question.service';
import { QuizQuestion } from 'app/shared/model/quiz-question.model';

describe('Component Tests', () => {
  describe('QuizQuestion Management Component', () => {
    let comp: QuizQuestionComponent;
    let fixture: ComponentFixture<QuizQuestionComponent>;
    let service: QuizQuestionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LearnportalTestModule],
        declarations: [QuizQuestionComponent],
        providers: []
      })
        .overrideTemplate(QuizQuestionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(QuizQuestionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(QuizQuestionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new QuizQuestion(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.quizQuestions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
