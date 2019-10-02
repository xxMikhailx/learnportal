import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IQuizQuestion } from 'app/shared/model/quiz-question.model';

type EntityResponseType = HttpResponse<IQuizQuestion>;
type EntityArrayResponseType = HttpResponse<IQuizQuestion[]>;

@Injectable({ providedIn: 'root' })
export class QuizQuestionService {
  public resourceUrl = SERVER_API_URL + 'api/quiz-questions';

  constructor(protected http: HttpClient) {}

  create(quizQuestion: IQuizQuestion): Observable<EntityResponseType> {
    return this.http.post<IQuizQuestion>(this.resourceUrl, quizQuestion, { observe: 'response' });
  }

  update(quizQuestion: IQuizQuestion): Observable<EntityResponseType> {
    return this.http.put<IQuizQuestion>(this.resourceUrl, quizQuestion, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IQuizQuestion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IQuizQuestion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
