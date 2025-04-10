import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { RegistrationDto } from '../../model/registrationDto/registration-dto';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiBaseUrl + '/api/auth';


  registerUser(registrationData: RegistrationDto): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/register`, registrationData, { responseType: 'text' as 'json' });
  }
}
