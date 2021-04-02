import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * to iniate a chat
   * @param object 
   * @returns 
   */
  initiateChat(object): Observable<any> {
    // object = {
    //   "userIds": ["dec73f56c234418a8e29f8c18875d388"],
    //   "type": "consumer-to-consumer"
    // }
    return this.http.post(`${config.BASE_URL}room/initiate`, object);
  }

  /**
   * to send a message
   * @param id 
   * @param object 
   * @returns 
   */
  postMessage(id,object): Observable<any> {
    //object = {
    //   "messageText": 1
    // }
    //id=c62fa1dcb882414196751a3e879364a6
    return this.http.post(`${config.BASE_URL}room/${id}/message`, object);
  }

  /**
   * to get recent conversation in chat room
   * @returns 
   */
  getRecentConversation(): Observable<any> {
    return this.http.get(`${config.BASE_URL}room`);
  }

  /**
   * to mark message as read message
   * @param id 
   * @returns 
   */
  markAsRead(id): Observable<any> {
    //id = c62fa1dcb882414196751a3e879364a6
    return this.http.get(`${config.BASE_URL}room/${id}/mark-read`);
  }

  /**
   * to receive messages of specific room
   * @param id 
   * @param limit 
   * @param skip 
   * @returns 
   */
  getConversationForRoom(id,limit,skip): Observable<any> {
    //id = c62fa1dcb882414196751a3e879364a6
    //limit = 5
    //page = 0
    return this.http.get(`${config.BASE_URL}room/${id}?limit=${limit}&page=${skip}`);
  }
  
  /**
   * Delete messages of chat room
   * @param id 
   * @returns 
   */
  deleteChatRoomAndMessages(id): Observable<any> {
    //id = 3e84fdaf8f0f46d1a8cee56f84aab7e8s
    return this.http.delete(`${config.BASE_URL}delete/room/${id}`);
  }

  /**
   * Delete a specific message by id
   * @param id 
   * @returns 
   */
  deleteMessageById(id): Observable<any> {
    //id = fdea0549867040a3b43495443491cdccs
    return this.http.delete(`${config.BASE_URL}delete/message/${id}`);
  }
}
