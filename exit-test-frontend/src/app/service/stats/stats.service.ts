import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<number> {
    return this.http.get<number>('http://localhost:8080/api/v1/stats/getNumberOfUsers');
  }

  getQuestions(): Observable<number> {
    return this.http.get<number>('http://localhost:8080/api/v1/stats/getQuestions');
  }
}
