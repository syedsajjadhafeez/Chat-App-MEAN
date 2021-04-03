import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChatRoomComponent } from './pages/chat-room/chat-room.component'
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';


const routes: Routes = [
  { path:'', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path:'signup', component: SignupComponent},
  { path: 'inbox', component: ChatRoomComponent }

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
