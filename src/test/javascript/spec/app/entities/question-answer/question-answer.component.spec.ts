/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LearnportalTestModule } from '../../../test.module';
import { QuestionAnswerComponent } from 'app/entities/question-answer/question-answer.component';
import { QuestionAnswerService } from 'app/entities/question-answer/question-answer.service';
import { QuestionAnswer } from 'app/shared/model/question-answer.model';

describe('Component Tests', () => {
    describe('QuestionAnswer Management Component', () => {
        let comp: QuestionAnswerComponent;
        let fixture: ComponentFixture<QuestionAnswerComponent>;
        let service: QuestionAnswerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LearnportalTestModule],
                declarations: [QuestionAnswerComponent],
                providers: []
            })
                .overrideTemplate(QuestionAnswerComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(QuestionAnswerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuestionAnswerService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new QuestionAnswer(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.questionAnswers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
