import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LearnportalTestModule } from '../../../test.module';
import { QuizQuestionDetailComponent } from 'app/entities/quiz-question/quiz-question-detail.component';
import { QuizQuestion } from 'app/shared/model/quiz-question.model';

describe('Component Tests', () => {
  describe('QuizQuestion Management Detail Component', () => {
    let comp: QuizQuestionDetailComponent;
    let fixture: ComponentFixture<QuizQuestionDetailComponent>;
    const route = ({ data: of({ quizQuestion: new QuizQuestion(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LearnportalTestModule],
        declarations: [QuizQuestionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(QuizQuestionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(QuizQuestionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.quizQuestion).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
