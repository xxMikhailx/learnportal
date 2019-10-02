import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { LearnportalTestModule } from '../../../test.module';
import { DeckDeleteDialogComponent } from 'app/entities/deck/deck-delete-dialog.component';
import { DeckService } from 'app/entities/deck/deck.service';

describe('Component Tests', () => {
  describe('Deck Management Delete Component', () => {
    let comp: DeckDeleteDialogComponent;
    let fixture: ComponentFixture<DeckDeleteDialogComponent>;
    let service: DeckService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LearnportalTestModule],
        declarations: [DeckDeleteDialogComponent]
      })
        .overrideTemplate(DeckDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DeckDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DeckService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
