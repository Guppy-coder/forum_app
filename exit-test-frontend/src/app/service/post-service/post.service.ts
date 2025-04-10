import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../login-service/login.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'http://localhost:8080/api/v1/questions/postQuestion';

  createPost(title: string, description: string, userEmail: string, date: string, productCode: any) {
    const token = new AuthService(this.http).getToken();
    console.log(token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    console.log(this.apiUrl,{title, description, userEmail, date, productCode},
      {headers, responseType: 'text' as 'json'});
    return this.http.post<string>('http://localhost:8080/api/v1/questions/postQuestion', 
      {title, description, userEmail, date, productCode},
      {headers, responseType: 'text' as 'json'});
  }

  constructor(private http: HttpClient) { }

  // createPost()
}
