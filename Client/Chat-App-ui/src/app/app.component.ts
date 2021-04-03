import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './models/user';
import { SocketService } from './services/socket.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Chat-App-ui';
  currentUser:Observable<User>;
  constructor(private userService : UserService, private router: Router){
    this.currentUser= userService.__currentUser__.asObservable()
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['login']);
    this.userService.currentUser=null;
    
  }
}
