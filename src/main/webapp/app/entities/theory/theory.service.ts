import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITheory } from 'app/shared/model/theory.model';

type EntityResponseType = HttpResponse<ITheory>;
type EntityArrayResponseType = HttpResponse<ITheory[]>;

@Injectable({ providedIn: 'root' })
export class TheoryService {
    public resourceUrl = SERVER_API_URL + 'api/theories';

    constructor(protected http: HttpClient) {}

    create(theory: ITheory): Observable<EntityResponseType> {
        return this.http.post<ITheory>(this.resourceUrl, theory, { observe: 'response' });
    }

    update(theory: ITheory): Observable<EntityResponseType> {
        return this.http.put<ITheory>(this.resourceUrl, theory, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITheory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITheory[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
