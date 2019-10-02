import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITaskGivenData } from 'app/shared/model/task-given-data.model';

type EntityResponseType = HttpResponse<ITaskGivenData>;
type EntityArrayResponseType = HttpResponse<ITaskGivenData[]>;

@Injectable({ providedIn: 'root' })
export class TaskGivenDataService {
  public resourceUrl = SERVER_API_URL + 'api/task-given-data';

  constructor(protected http: HttpClient) {}

  create(taskGivenData: ITaskGivenData): Observable<EntityResponseType> {
    return this.http.post<ITaskGivenData>(this.resourceUrl, taskGivenData, { observe: 'response' });
  }

  update(taskGivenData: ITaskGivenData): Observable<EntityResponseType> {
    return this.http.put<ITaskGivenData>(this.resourceUrl, taskGivenData, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITaskGivenData>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITaskGivenData[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
