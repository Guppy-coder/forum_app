import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../login-service/login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  postComment(comment: string, questionId: number): Observable<any> {

    const token = new AuthService(this.http).getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post('http://localhost:8080/api/v1/comments/comment/' + questionId, { comment }, 
      { headers, responseType: 'text' as 'json' })
  }
}
