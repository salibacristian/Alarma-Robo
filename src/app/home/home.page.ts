import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion/ngx';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { timer } from 'rxjs';
import { Platform } from 'ionic-angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private deviceMotion: DeviceMotion;
  private deviceOrientation: DeviceOrientation;
  private nativeAudio: NativeAudio;
  private flashlight: Flashlight;
  private vibration: Vibration;
  public analizarMovimientos: any;
  public analizarOrientacion: any;
  public locked: boolean;
  public horizontal: boolean;
  public reproduciendoAudio: boolean;
  public router: Router;
  public estado: string;
  public orientacion: number;
  vertical = true;
  icon='unlock';
  color="success";
  izquierda=true;
  flash=false;
  derecha=true;
  constructor(router: Router, deviceMotion: DeviceMotion,
    deviceOrientation: DeviceOrientation, nativeAudio: NativeAudio, flashlight: Flashlight,
    vibration: Vibration, private platform: Platform) {
    this.deviceMotion = deviceMotion;
    this.deviceOrientation = deviceOrientation;
    this.nativeAudio = nativeAudio;
    this.flashlight = flashlight;
    this.vibration = vibration;
    this.router = router;

    this.locked = false;
    this.horizontal = true;
    this.reproduciendoAudio = false;
    this.estado = 'Desactivada';
    this.orientacion = 0;

    // Precarga los archivos en memoria asignandoles un ID
  }

  // Envento disparado al desactivar/activar la alarma
  public toActivarAlarma() {

    // Si tenía la alarma activada, la desactiva, deja de escuchar los cambios en el movimiento y la orientación del dispositivo 
    // y frena todos los audios que haya en curso
    if (this.locked) {
      this.color='success';
      this.locked = false;
      this.estado = 'Desactivada';
      this.icon = "unlock";
      this.analizarMovimientos.unsubscribe();
      this.analizarOrientacion.unsubscribe();
    } else {
      this.color='success';
      this.color='danger';
      this.icon = "lock";
      // Si la alarma estaba desactivada, la activa
      this.locked = true;
      this.estado = 'Activada';
      this.orientacion = 0;

      const options: DeviceMotionAccelerometerOptions = { frequency: 50 };
      // Comienza a escuchar los cambios en el movimiento del dispositivo
      this.analizarMovimientos = this.deviceMotion.watchAcceleration(options)
        .subscribe((acceleration: DeviceMotionAccelerationData) => {


          if (acceleration.x > 8) {
            if(this.izquierda){
              this.izquierda = false;
              this.play('izquierda');
              timer(4000).subscribe(dd=>{this.izquierda=true});
            }
          }
          else if (acceleration.x < -8) {
            if(this.derecha){
              this.derecha = false;
              this.play('derecha');
              timer(5000).subscribe(d=>{this.derecha=true});
            }
          }
          else if ((acceleration.x > -3.0 && acceleration.x < 3.0 && acceleration.y > 8.5)) {
            if(this.vertical){
              this.vertical = false;
              if(!this.flash){
                this.flashlight.switchOn();
                this.flash = true;
              }
              this.play('vertical');
              timer(5000).subscribe(data=>{
                this.flashlight.switchOff();
                this.vertical = true;
              })
              this.horizontal = false;
            }
            
          }
          else if (acceleration.x > -3.0 && acceleration.x < 3.0 && acceleration.y < 1 && acceleration.y > -1) {
            if (this.horizontal === false) {
              this.vibration.vibrate(5000);
              this.horizontal = true;
              this.play('horizontal');
              this.flash = false;
            }
          }
        });

    }
  }

  play(pos) {
    let path = "../assets/sonidos/" + pos + ".mp3";
    let audioAsset = new Audio(path);
    audioAsset.play();
  }
}
