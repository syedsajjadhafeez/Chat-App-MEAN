import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private http: HttpClient
  ) { }

  initiateChat(object) {
    // object = {
    //   "userIds": ["dec73f56c234418a8e29f8c18875d388"],
    //   "type": "consumer-to-consumer"
    // }
    return this.http.post<any>(`${config.BASE_URL}room/initiate`, object);
  }

  postMessage(id,object) {
    //object = {
    //   "messageText": 1
    // }
    //id=c62fa1dcb882414196751a3e879364a6
    return this.http.post<any>(`${config.BASE_URL}room/${id}/message`, object);
  }

  getRecentConversation() {
    return this.http.get<any>(`${config.BASE_URL}room`);
  }

  markAsRead(id) {
    //id = c62fa1dcb882414196751a3e879364a6
    return this.http.get<any>(`${config.BASE_URL}room/${id}/mark-read`);
  }

  getConversationForRoom(id,limit,skip) {
    //id = c62fa1dcb882414196751a3e879364a6
    //limit = 5
    //page = 0
    return this.http.get<any>(`${config.BASE_URL}room/${id}?limit=${limit}&page=${skip}`);
  }
  
  deleteChatRoomAndMessages(id) {
    //id = 3e84fdaf8f0f46d1a8cee56f84aab7e8s
    return this.http.delete<any>(`${config.BASE_URL}delete/room/${id}`);
  }

  deleteMessageById(id) {
    //id = fdea0549867040a3b43495443491cdccs
    return this.http.delete<any>(`${config.BASE_URL}delete/message/${id}`);
  }
}
