/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { LearnportalTestModule } from '../../../test.module';
import { TaskFindDataDeleteDialogComponent } from 'app/entities/task-find-data/task-find-data-delete-dialog.component';
import { TaskFindDataService } from 'app/entities/task-find-data/task-find-data.service';

describe('Component Tests', () => {
    describe('TaskFindData Management Delete Component', () => {
        let comp: TaskFindDataDeleteDialogComponent;
        let fixture: ComponentFixture<TaskFindDataDeleteDialogComponent>;
        let service: TaskFindDataService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LearnportalTestModule],
                declarations: [TaskFindDataDeleteDialogComponent]
            })
                .overrideTemplate(TaskFindDataDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TaskFindDataDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaskFindDataService);
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
