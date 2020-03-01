import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';
import { Token } from '../models/token';

@Component({
  selector: 'app-logon',
  templateUrl: './logon.component.html',
  styleUrls: ['./logon.component.css']
})
export class LogonComponent implements OnInit {

  private logonForm: FormGroup;
  private authenticationToken : Token;
  private loginError: String;

  constructor(private formBuilder: FormBuilder, 
      private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.logonForm = this.createFormGroup(this.formBuilder);
  }

  onSubmit() {
    if (this.logonForm.valid) {
      console.log("Form Submitted!");
    }
    const user: User = {
      username: this.logonForm.get('username').value,
      password: this.logonForm.get('password').value
    };
    
    this.authenticationService.LoginAndGetToken(user)
        .subscribe(res => 
          {
            console.log(res);
            this.authenticationToken = res;
            this.loginError = '';
            localStorage.setItem('auth_token', res.token);
          },
          error => {
            this.authenticationToken = {
              token: ''
            };
            this.loginError = JSON.stringify(error);
            localStorage.setItem('auth_token', '');
          });
  }

  //create the formgroup with default values
  createFormGroup(formBuilder: FormBuilder) {
    return formBuilder.group({
      username: 'demoUser',
      password: 'demoPassword'
    });
  }
}
