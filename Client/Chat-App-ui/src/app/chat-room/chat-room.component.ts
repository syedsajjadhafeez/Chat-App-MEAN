import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  title = 'angular-chat';
  channel = "room1";
  username = 'user1';
  messages = ["hi","what","how","who"] ;
  newMessage = '';
  channelList = ["channel1","channel3","channel2",]


  
  constructor() { }

  ngOnInit(): void {
  }

}
