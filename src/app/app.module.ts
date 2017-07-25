import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {StudentsPage} from "../pages/students/students";
import {StudentData} from "../services/student/student.data";
import {HttpModule} from "@angular/http";
import {EditStudentPage} from "../pages/students/editStudent/editStudent";
import {ViewStudentPage} from "../pages/students/viewStudent/viewStudent";
import {GradeService} from "../services/grade.service";
import {StudentEvents} from "../services/student/student.events";
import {StudentService} from "../services/student/student.service";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    StudentsPage,
    EditStudentPage,
    ViewStudentPage
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
    EditStudentPage,
    ViewStudentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StudentData,
    StudentEvents,
    StudentService,
    GradeService
  ]
})
export class AppModule {}
