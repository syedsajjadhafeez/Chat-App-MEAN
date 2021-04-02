import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  /**
   *  Authorizes user
   * @param userId : uuid
   * @returns {Observable<any>}
   */
  login(userId): Observable<any>{
    return this.http.get(`${config.BASE_URL}login/${userId}`);
  }
}
