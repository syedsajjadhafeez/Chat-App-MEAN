import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  firstName: string;
  lastName: string;
  username: string;
  type = 'consumer';

  constructor(private userService: UserService, private router: Router) { }
  ngOnInit(): void {
  }

  async register() {
    let usernameRegex = /^[a-zA-Z0-9]+$/;
    let isValidUsername = this.username.match(usernameRegex);
    try {
      if (isValidUsername
        && (this.firstName && this.firstName.length > 0)
        && (this.lastName && this.lastName.length > 0)
        && (this.username && this.username.length > 0)) {
        let data: User = {
          "firstName": this.firstName,
          "lastName": this.lastName,
          "type": "consumer",
          "username": this.username
        };
        let response = await this.userService.createUser(data).toPromise();

        if (response.success) {
          alert('Registration Successful')
          this.router.navigate(['login']);
        }
      }else{
        alert('Invalid username or form data missing')
      }
    } catch (error) {

    }

  }
}
