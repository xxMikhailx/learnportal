import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { LearnportalTestModule } from '../../../test.module';
import { QuestionAnswerUpdateComponent } from 'app/entities/question-answer/question-answer-update.component';
import { QuestionAnswerService } from 'app/entities/question-answer/question-answer.service';
import { QuestionAnswer } from 'app/shared/model/question-answer.model';

describe('Component Tests', () => {
  describe('QuestionAnswer Management Update Component', () => {
    let comp: QuestionAnswerUpdateComponent;
    let fixture: ComponentFixture<QuestionAnswerUpdateComponent>;
    let service: QuestionAnswerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LearnportalTestModule],
        declarations: [QuestionAnswerUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(QuestionAnswerUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(QuestionAnswerUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(QuestionAnswerService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new QuestionAnswer(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new QuestionAnswer();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
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
