import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
	

  email : string;
  password : string;
  constructor(public authService: AuthService) { }

  Login(){
  	this.authService.login(this.email, this.password);
  }
 

}