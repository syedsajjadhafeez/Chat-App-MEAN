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
   * @param username: uuid
   * @returns {Observable<any>}
   */
  login(username): Observable<any>{
    return this.http.post(`${config.BASE_URL}users/login`,{username});
  }

  getAuthToken(){
   return localStorage.getItem('token')?localStorage.getItem('token'):'';
  }

}
