import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {StudentsPage} from "../pages/students/students";
import {StudentService} from "../services/students.service";
import {HttpModule} from "@angular/http";
import {StudentPage} from "../pages/students/student/editStudent";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    StudentsPage,
    StudentPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    StudentsPage,
    StudentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StudentService
  ]
})
export class AppModule {}
