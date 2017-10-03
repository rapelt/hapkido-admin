import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {StudentsPage} from '../pages/students/students';
import {StudentData} from '../services/student/student.data';
import {HttpModule} from '@angular/http';
import {EditStudentPage} from '../pages/students/editStudent/editStudent';
import {ViewStudentPage} from '../pages/students/viewStudent/viewStudent';
import {GradeService} from '../services/grade.service';
import {StudentEvents} from '../services/student/student.events';
import {StudentService} from '../services/student/student.service';
import {ClassesPage} from '../pages/classes/classes';
import {IonCalendar} from '../components/calendar/calendar';
import { SampleComponent } from '../components/sample/sample';
import {AddClassesPage} from '../pages/classes/addClasses/addClasses';
import {ClassService} from '../services/class/class.service';
import { SortDatesPipe } from '../pipes/sort-dates/sort-dates';
import {ClassData} from '../services/class/class.data';
import {ClassEvents} from '../services/class/class.events';
import {SelectClassPage} from '../pages/attendance/selectClass';
import {ClassAttendancePage} from '../pages/attendance/class-attendance/class-attendance';
import {AttendanceService} from '../services/attendance.service';
import {EnvironmentsModule} from './enviroment/enviroment.module';
import {SearchStudentPage} from '../pages/search-student/search-student';
import { AlphabeticalStudentsPipe } from '../pipes/alphabetical-students/alphabetical-students';
import { FilterByPreferredClassTypePipe } from '../pipes/filter-by-preferred-class-type/filter-by-preferred-class-type';
import {AuthService} from '../services/auth/auth.service';
import {AttendanceComponent} from '../components/attendance/attendance';
import { SearchStudentComponent } from '../components/search-student/search-student';
import {ErrorEvents} from '../services/error.events';
import {ErrorComponent} from '../components/error/error';
import { ToastComponent } from '../components/toast/toast';
import {ToastEvents} from '../services/toast.events';
import { PrioritiseSelectedClassPipe } from '../pipes/prioritise-selected-class/prioritise-selected-class';
import {GradesPage} from '../pages/grades/grades';
import {GradingAttendancePage} from '../pages/grading-attendance/grading-attendance';
import { StudentListComponent } from '../components/student-list/student-list';
import { GradeBadgeComponent } from '../components/grade-badge/grade-badge';

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
    ClassAttendancePage,
    SearchStudentPage,
    AlphabeticalStudentsPipe,
    FilterByPreferredClassTypePipe,
    AttendanceComponent,
    SearchStudentComponent,
    ErrorComponent,
    ToastComponent,
    PrioritiseSelectedClassPipe,
    GradesPage,
    GradingAttendancePage,
    StudentListComponent,
    GradeBadgeComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    EnvironmentsModule
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
    ClassAttendancePage,
    SearchStudentPage,
    GradesPage,
    GradingAttendancePage
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
    AttendanceService,
    AuthService,
    ErrorEvents,
    ToastEvents
  ]
})
export class AppModule {}
