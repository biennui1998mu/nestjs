import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'angunest-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: boolean = true;
  registerForm: boolean = false;
  alert: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  goRegister() {
    this.loginForm = false;
    this.registerForm = true;
  }

  returnLogin() {
    this.loginForm = true;
    this.registerForm = false;
  }
}
