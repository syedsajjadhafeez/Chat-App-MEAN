import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { config } from 'src/environments/environment';

/**
 * UserService
 * Purpose of class is to manage user 
 * and associated operations
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  /**
   * Fetches user
   * @param {string} userId : uuid
   * @returns {Observable<any>}
   */
  getUserById(userId:string): Observable<any>{
    return this.http.get(`${config.BASE_URL}users/${userId}`);
  }
  /**
   * Deletes user
   * @param {string} userId : uuid
   * @returns {Observable<any>}
   */
  deleteUserById(userId:string): Observable<any>{
    return this.http.delete(`${config.BASE_URL}users/${userId}`);
  }
  /**
   * Creates new user
   * @param {User} userData 
   * @returns {Observable<any>}
   */
  createUser(userData: User):Observable<any>{
    return this.http.post(`${config.BASE_URL}users`, userData);
  }
  /**
   * fetches all users
   * @returns {Observable<any>}
   */
  getAllUsers(): Observable<any>{
    return this.http.get(`${config.BASE_URL}users`);
  }
}
