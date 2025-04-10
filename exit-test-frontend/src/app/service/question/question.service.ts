import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Question } from '../../model/question/question';
import { AuthService } from '../login-service/login.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  
  private apiUrl = `${environment.apiBaseUrl}/api/v1/search/searchQuestion`;

  constructor(private http: HttpClient) { }

    searchQuestions(
    text?: string,
    productCode?: string,
    email?: string,
    label?: string,
    date?: Date
  ): Observable<Question[]> {
    let params = new HttpParams();

    if (text) params = params.append('title', text);
    if (productCode) params = params.append('productCode', productCode);
    if (label) params = params.append('label', label);
    if (email) params = params.append('email', email);
    if (date) params = params.append('date', date.toISOString());

    const token = new AuthService(this.http).getToken();
    console.log(token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    console.log(this.apiUrl, params.toString(), headers);


    return this.http.get<Question[]>(this.apiUrl, { params, headers });
  }

  // Advanced search with pagination support
  advancedSearch(
    filters: {
      text?: string;
      productCode?: string;
      email?: string;
      label?: string;
      date?: Date;
      page?: number;
      size?: number;
    }
  ): Observable<{ questions: Question[]; totalCount: number }> {
    let params = new HttpParams();

    if (filters.text) params = params.append('text', filters.text);
    if (filters.productCode) params = params.append('productCode', filters.productCode);
    if (filters.email) params = params.append('email', filters.email);
    if (filters.label) params = params.append('label', filters.label);
    if (filters.date) params = params.append('date', filters.date.toISOString());
    if (filters.page) params = params.append('page', filters.page.toString());
    if (filters.size) params = params.append('size', filters.size.toString());

    return this.http.get<{ questions: Question[]; totalCount: number }>(`${this.apiUrl}/advanced`, { params });
  }

  likeQuestion(questionId: number): Observable<any> {
    const token = new AuthService(this.http).getToken();
    console.log(token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    const url = `${environment.apiBaseUrl}/api/v1/questions/like/${questionId}`;
    return this.http.put(url,{}, { headers, responseType: 'text' as 'json' });
  }

  getQuestionById(questionId: number): Observable<Question> {
    const token = new AuthService(this.http).getToken();
    console.log(token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    const url = `${environment.apiBaseUrl}/api/v1/questions/` + questionId;
    return this.http.get<Question>(url, { headers });
  }
}