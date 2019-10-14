import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDeck } from 'app/shared/model/deck.model';

type EntityResponseType = HttpResponse<IDeck>;
type EntityArrayResponseType = HttpResponse<IDeck[]>;

@Injectable({ providedIn: 'root' })
export class DeckService {
  public resourceUrl = SERVER_API_URL + 'api/decks';

  constructor(protected http: HttpClient) {}

  create(deck: IDeck): Observable<EntityResponseType> {
    return this.http.post<IDeck>(this.resourceUrl, deck, { observe: 'response' });
  }

  update(deck: IDeck): Observable<EntityResponseType> {
    return this.http.put<IDeck>(this.resourceUrl, deck, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDeck>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDeck[]>(`${this.resourceUrl}/rsql`, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
