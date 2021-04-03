import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username='';
  constructor(private userService: UserService, 
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

 async login(){
   console.log(this.username)
    if(!this.username || this.username.length===0){
      alert('Please enter valid username')
      return
    }

  try {
    let response= await this.authService.login(this.username).toPromise();
    let { success,user,authorization} = response;
    if(success){ 
      let tempUser:User = {
        firstName: user.firstName,
        lastName:user.lastName,
        type: user.type,
        username:user.username
    }; 
      localStorage.setItem('token',authorization);
      localStorage.setItem('user',JSON.stringify(user));
      this.userService.currentUser= tempUser;
      this.router.navigate([''])
    }
  } catch (error) {
      alert('Something went wrong!')
  }

  }

}
