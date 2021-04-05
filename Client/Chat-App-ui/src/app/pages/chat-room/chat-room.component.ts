import { Component, OnInit, ElementRef ,ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { ChatService } from 'src/app/services/chat.service';
import { SocketService } from 'src/app/services/socket.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  @ViewChild('scrollToBottom') private myScrollContainer: ElementRef;

  allUsers =[];
  currentUser:User;
  conversation=[];
  currentUserMessage:string = '';
  currentRoomId='';
  constructor(private userService: UserService, 
    private chatService:ChatService,
    private socketService: SocketService) { }

  ngOnInit(): void {
    this.initData();
  }

  initData(){
    this.userService.__currentUser__.subscribe(user=>this.currentUser=user);
    this.getAllUsers();
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe(usres=> {
      if(usres.success){
        let users = usres.users.filter(user=> user.username != this.currentUser.username)
        this.allUsers= users;
      }
    });
  }


  startChat(userId:string){
    let data= {userIds: [userId], type:'consumer-to-consumer'};
    this.chatService.initiateChat(data).subscribe(response=>{
      console.log(response)
      if(response.success && response.chatRoom.chatRoomId){
        this.currentRoomId = response.chatRoom.chatRoomId 
        this.getConversation();
        this.socketService.listenMessages(this.currentRoomId,()=>{this.getConversation()});
        this.scrollToBottom();
      }
    });
  }

  onNewMessage(){
    this.getConversation();
    console.log('loading messages');
    
  }

  getRecentChats(){
    this.chatService.getRecentConversation().subscribe(response=>console.log(response))
    this.scrollToBottom();
  }
  
  getConversation(){
    this.chatService.getConversationForRoom(this.currentRoomId,200,0).subscribe(response=>this.conversation = response.conversation)
  }

  sendMessage(){
    if(this.currentUserMessage==='') return;

    let messageDetails= {
      "messageText":this.currentUserMessage
    };
    this.chatService.postMessage(this.currentRoomId,messageDetails).subscribe(response=>{
      this.currentUserMessage=''}
    );
    setTimeout(() => {
      this.scrollToBottom();
    }, 200);  
    
  }

  
  scrollToBottom() :void{
    try {
      setTimeout(() => {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      }, 500);
  } catch(err) { }                 
  }
  
  ngOnDestroy() {
    this.socketService.removeListener(this.currentRoomId)
  }
}

