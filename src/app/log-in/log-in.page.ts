import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  email;
  password;
  constructor(private authService: AuthService, private publicRouter: Router, public alertController: AlertController) { }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Por favor, reingrese.',
      buttons: ['OK']
    });

    await alert.present();
  }

  OnSubmitLogIn() {
    this.authService.logIn(this.email, this.password).then(res => {
      console.log(res['user']['uid']);
      this.publicRouter.navigate(['/home']);
    }).catch(err => { console.log(err); this.presentAlert() });
  }
  Rellenar(usr, password) {
    this.email = usr + "@" + usr + ".com";
    this.password = password;
  }

}
