import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Deck } from 'app/shared/model/deck.model';
import { DeckService } from './deck.service';
import { DeckComponent } from './deck.component';
import { DeckDetailComponent } from './deck-detail.component';
import { DeckUpdateComponent } from './deck-update.component';
import { DeckDeletePopupComponent } from './deck-delete-dialog.component';
import { IDeck } from 'app/shared/model/deck.model';

@Injectable({ providedIn: 'root' })
export class DeckResolve implements Resolve<IDeck> {
  constructor(private service: DeckService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDeck> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Deck>) => response.ok),
        map((deck: HttpResponse<Deck>) => deck.body)
      );
    }
    return of(new Deck());
  }
}

export const deckRoute: Routes = [
  {
    path: '',
    component: DeckComponent,
    data: {
      authorities: [],
      pageTitle: 'learnportalApp.deck.home.title'
    }
  },
  {
    path: ':id/view',
    component: DeckDetailComponent,
    resolve: {
      deck: DeckResolve
    },
    data: {
      authorities: [],
      pageTitle: 'learnportalApp.deck.home.title'
    }
  },
  {
    path: 'new',
    component: DeckUpdateComponent,
    resolve: {
      deck: DeckResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'learnportalApp.deck.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DeckUpdateComponent,
    resolve: {
      deck: DeckResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'learnportalApp.deck.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const deckPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DeckDeletePopupComponent,
    resolve: {
      deck: DeckResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'learnportalApp.deck.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
