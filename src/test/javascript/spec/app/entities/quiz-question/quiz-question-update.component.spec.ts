/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LearnportalTestModule } from '../../../test.module';
import { QuizQuestionUpdateComponent } from 'app/entities/quiz-question/quiz-question-update.component';
import { QuizQuestionService } from 'app/entities/quiz-question/quiz-question.service';
import { QuizQuestion } from 'app/shared/model/quiz-question.model';

describe('Component Tests', () => {
    describe('QuizQuestion Management Update Component', () => {
        let comp: QuizQuestionUpdateComponent;
        let fixture: ComponentFixture<QuizQuestionUpdateComponent>;
        let service: QuizQuestionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LearnportalTestModule],
                declarations: [QuizQuestionUpdateComponent]
            })
                .overrideTemplate(QuizQuestionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(QuizQuestionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuizQuestionService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new QuizQuestion(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.quizQuestion = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new QuizQuestion();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.quizQuestion = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
