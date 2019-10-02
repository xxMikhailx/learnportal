/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LearnportalTestModule } from '../../../test.module';
import { DeckDetailComponent } from 'app/entities/deck/deck-detail.component';
import { Deck } from 'app/shared/model/deck.model';

describe('Component Tests', () => {
    describe('Deck Management Detail Component', () => {
        let comp: DeckDetailComponent;
        let fixture: ComponentFixture<DeckDetailComponent>;
        const route = ({ data: of({ deck: new Deck(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LearnportalTestModule],
                declarations: [DeckDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DeckDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DeckDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.deck).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
