import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from 'src/app/classes/user'
import { UserToken } from 'src/app/classes/userToken'
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  private apiUrl = "https://localhost:5001/api/";

  constructor(private http: HttpClient) { }

  login(email: string, password: string) : Observable<boolean>{
    let data = new User();
    data.Email = email;
    data.Password = password;

    // get token
    return this.http.post(this.apiUrl + "auth", data).pipe(map(response => {
      let user = response as UserToken;
      this.setSession(user);
      if (this.isLoggedIn())
        return true;
      else
        return false;
    }));
  }

  setSession(user: UserToken){
    localStorage.setItem('token', user.token);
    localStorage.setItem('username', user.userName);
    localStorage.setItem('expires_at', JSON.stringify(moment().add(user.lifetime, 'minute')));
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('expires_at');
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }
  
  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }   

  getUserName() {
    return localStorage.getItem("username");
  }
}
