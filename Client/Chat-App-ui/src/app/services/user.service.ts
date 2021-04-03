import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

  __currentUser__: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    this.__currentUser__ = new BehaviorSubject<User>(null)
   }

  get currentUser():User{
    return this.__currentUser__.value;
  }
  set currentUser(value:User){
    this.__currentUser__.next(value);
  }
  
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
