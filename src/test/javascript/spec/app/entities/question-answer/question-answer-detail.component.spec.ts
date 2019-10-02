import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LearnportalTestModule } from '../../../test.module';
import { QuestionAnswerDetailComponent } from 'app/entities/question-answer/question-answer-detail.component';
import { QuestionAnswer } from 'app/shared/model/question-answer.model';

describe('Component Tests', () => {
  describe('QuestionAnswer Management Detail Component', () => {
    let comp: QuestionAnswerDetailComponent;
    let fixture: ComponentFixture<QuestionAnswerDetailComponent>;
    const route = ({ data: of({ questionAnswer: new QuestionAnswer(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LearnportalTestModule],
        declarations: [QuestionAnswerDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(QuestionAnswerDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(QuestionAnswerDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.questionAnswer).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
