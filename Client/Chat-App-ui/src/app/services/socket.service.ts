import { Injectable } from '@angular/core';
import * as socketio from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket:any;
  constructor() { 
    this.initSockets();
  }

  initSockets(){
    this.socket=socketio.connect('http://localhost:3000');
    this.socket.on('connect', (data) => {
      console.log('Client Connected');
    });
    this.socket.on('disconnect', data=>{console.log(data)});
  }
  /**
   * 
   * @param roomId 
   * @param newMessageCB 
   */
  listenMessages(roomId,newMessageCB){
    this.socket.on(roomId,newMessageCB);
  }

  removeListener(eventName){
    this.socket.removeAllListeners([eventName]);
  }
}
