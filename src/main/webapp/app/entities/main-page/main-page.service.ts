import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMainPage } from 'app/shared/model/main-page.model';

type EntityResponseType = HttpResponse<IMainPage>;
type EntityArrayResponseType = HttpResponse<IMainPage[]>;

@Injectable({ providedIn: 'root' })
export class MainPageService {
  public resourceUrl = SERVER_API_URL + 'api/main-pages';

  constructor(protected http: HttpClient) {}

  create(mainPage: IMainPage): Observable<EntityResponseType> {
    return this.http.post<IMainPage>(this.resourceUrl, mainPage, { observe: 'response' });
  }

  update(mainPage: IMainPage): Observable<EntityResponseType> {
    return this.http.put<IMainPage>(this.resourceUrl, mainPage, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMainPage>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMainPage[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
