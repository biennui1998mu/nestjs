import { UserService } from './../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'angunest-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  message: string;
  show: boolean = false;

  public formSignIn = {
    gmail: null,
    password: null
  }

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSignIn(){
    this.userService.login(this.formSignIn).subscribe( result => {
      if(result == true){
        this.router.navigateByUrl('');
      }else{
        this.message = result;
        setTimeout( () => {
          this.show = true;
        }, 1500)
      }
    })
  }
}
