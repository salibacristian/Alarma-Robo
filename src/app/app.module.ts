import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Platform } from 'ionic-angular';

import { DeviceMotion } from '@ionic-native/device-motion/ngx';
import { DeviceOrientation } from '@ionic-native/device-orientation/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBYL-IP-i1vHu1glzb1PDxlRc33n_Qt-_w",
  authDomain: "myapp3-c56a4.firebaseapp.com",
  databaseURL: "https://myapp3-c56a4.firebaseio.com",
  projectId: "myapp3-c56a4",
  storageBucket: "",
  messagingSenderId: "405034328954",
  appId: "1:405034328954:web:7095658f62bb14b0e96cc3"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Flashlight,
    { provide: FirestoreSettingsToken, useValue:{}},
    Vibration,
    NativeAudio,
    DeviceOrientation,
    DeviceMotion,
    Platform

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
