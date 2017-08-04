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
import {ClassesPage} from "../pages/classes/classes";
import {IonCalendar} from "../components/calendar/calendar";
import { SampleComponent } from '../components/sample/sample';
import {AddClassesPage} from "../pages/classes/addClasses/addClasses";
import {ClassService} from "../services/class/class.service";
import { SortDatesPipe } from '../pipes/sort-dates/sort-dates';
import {ClassData} from "../services/class/class.data";
import {ClassEvents} from "../services/class/class.events";
import {SelectClassPage} from "../pages/attendance/selectClass";
import {ClassAttendancePage} from "../pages/attendance/class-attendance/class-attendance";
import {AttendanceService} from "../services/attendance.service";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    StudentsPage,
    EditStudentPage,
    ViewStudentPage,
    ClassesPage,
    IonCalendar,
    SampleComponent,
    AddClassesPage,
    SortDatesPipe,
    SelectClassPage,
    ClassAttendancePage
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
    ViewStudentPage,
    ClassesPage,
    AddClassesPage,
    SelectClassPage,
    ClassAttendancePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StudentData,
    StudentEvents,
    StudentService,
    GradeService,
    ClassService,
    ClassData,
    ClassEvents,
    AttendanceService
  ]
})
export class AppModule {}
