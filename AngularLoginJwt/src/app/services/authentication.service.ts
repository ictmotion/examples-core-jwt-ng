import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  LoginAndGetToken(user: User) {
    return this.httpClient.post<Token>
      ("https://localhost:44341/account/logon", user);
  }

  Logout()
  {
    localStorage.removeItem('auth_token');
  }
}
