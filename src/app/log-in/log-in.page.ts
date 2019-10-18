import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  email;
  password;
  constructor(private authService:AuthService, private publicRouter:Router) { }

  ngOnInit() {
  }

  OnSubmitLogIn(){
    this.authService.logIn(this.email, this.password).then(res => {
      console.log(res['user']['uid']);
      this.publicRouter.navigate(['/home']);
    }).catch(err => alert('Reingresar Datos'));
  }
  Rellenar(usr, password){
    this.email=usr+"@gmail.com";
    this.password = password;
  }

}
