import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { OrderApiService } from './../order-api.service'
import { AuthApiService } from './../auth-api.service'
import { User } from 'src/app/classes/user'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginFormControl = new FormControl('', [
    Validators.required
  ]);

  isLoggedIn: boolean;
  userName: string;

  email: string;
  password: string;

  constructor(private oService: OrderApiService, private authService: AuthApiService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userName = this.authService.getUserName();
  }

  login($event){
    this.authService.login(this.email, this.password).subscribe(success => {
      this.isLoggedIn = success;
      this.userName = this.authService.getUserName();
      if (success)
        alert("You logged in successfully!")
      else
        alert("Email or password is incorrect...")
    });
  }

  logout($event){
    this.email = '';
    this.password = '';
    this.authService.logout();
    this.isLoggedIn = this.authService.isLoggedIn();
  }

}
