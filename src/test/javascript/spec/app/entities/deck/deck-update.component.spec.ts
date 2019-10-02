import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { LearnportalTestModule } from '../../../test.module';
import { DeckUpdateComponent } from 'app/entities/deck/deck-update.component';
import { DeckService } from 'app/entities/deck/deck.service';
import { Deck } from 'app/shared/model/deck.model';

describe('Component Tests', () => {
  describe('Deck Management Update Component', () => {
    let comp: DeckUpdateComponent;
    let fixture: ComponentFixture<DeckUpdateComponent>;
    let service: DeckService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LearnportalTestModule],
        declarations: [DeckUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DeckUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DeckUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DeckService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Deck(123);
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
        const entity = new Deck();
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
