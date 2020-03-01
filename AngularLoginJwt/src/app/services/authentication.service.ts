import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { Token } from '../models/token';
//import 'rxjs/add/observable/of';

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

  // //https://stackoverflow.com/questions/38067580/property-of-does-not-exist-on-type-typeof-observable
  // //https://stackoverflow.com/questions/34660010/create-observablet-from-result
  // GetMoneyTransactionsObservable() : Observable<Array<MoneyTransaction>> {
  //   return of(this.moneyTransactionList);
  // }
}
