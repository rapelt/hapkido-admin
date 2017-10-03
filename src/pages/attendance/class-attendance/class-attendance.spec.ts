import {TestBed, ComponentFixture, async} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import {
  IonicModule, NavController, NavParams
} from 'ionic-angular';
import { MyApp } from '../../../app/app.component';
import {NavParamsMock} from "../../../testHelperMethods/NavParamsMock";
import {StudentData} from "../../../services/student/student.data";
import {ConnectionBackend, Http, HttpModule} from "@angular/http";
import {StudentDataMock} from "../../../services/student/student.data.mock";
import {ClassAttendancePage} from "./class-attendance";
import {GradeService} from "../../../services/grade.service";
import {StudentService} from "../../../services/student/student.service";
import {StudentEvents} from "../../../services/student/student.events";
import {Class} from "../../../models/class";
import * as moment from "moment";
import {AttendanceService} from "../../../services/attendance.service";
import {ClassService} from "../../../services/class/class.service";
import {ClassData} from "../../../services/class/class.data";
import {ClassDataMock} from "../../../services/class/class.data.mock";
import {ClassEvents} from "../../../services/class/class.events";
import {Observable} from "rxjs";
import {Name} from "../../../models/name";
import {Student} from "../../../models/student";
import {AlphabeticalStudentsPipe} from "../../../pipes/alphabetical-students/alphabetical-students";
import {FilterByPreferredClassTypePipe} from "../../../pipes/filter-by-preferred-class-type/filter-by-preferred-class-type";
import {SearchStudentComponent} from '../../../components/search-student/search-student';
import {StudentListComponent} from '../../../components/student-list/student-list';
import {GradeBadgeComponent} from '../../../components/grade-badge/grade-badge';
import {PrioritiseSelectedClassPipe} from '../../../pipes/prioritise-selected-class/prioritise-selected-class';
import {ToastEvents} from '../../../services/toast.events';
import {ErrorEvents} from '../../../services/error.events';
import {EnvironmentsModule} from '../../../app/enviroment/enviroment.module';

let classAttendancePage: ClassAttendancePage;
let fixture: ComponentFixture<ClassAttendancePage>;
let de: DebugElement;
let el: HTMLElement;

xdescribe('Page: Class Attendance Page', () => {
  let aclass = new Class("126", "", ['hb030', 'hb043'], false, moment(new Date(new Date().setDate(new Date().getDate() - 12))), "");

  const name1: Name = new Name('rebekah', 'apelt');
  const rebekah = new Student(name1, 'hb030', '0000', 2, true, [{date: moment(), grade: 0}], [], true, false, 'Adults');

  const name2: Name = new Name('mark', 'higgins');
  const mark = new Student(name2, 'hb055', '0000', 2, true, [{date: moment(), grade: 0}], [], true, false, 'Adults');

  const name3: Name = new Name('daniel', 'radcliffe');
  const daniel = new Student(name3, 'hb043', '0000', 2, true, [{date: moment(), grade: 0}], [], true, false,'Adults');

  const name4: Name = new Name('John', 'Geddes');
  const john = new Student(name4, 'hb044', '0000', 2, true, [{date: moment(), grade: 0}], [], false, false, 'Adults');

  let students = [rebekah, mark, daniel, john];

  let studentDataMock: StudentDataMock;
  let classDataMock: ClassDataMock;

    beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [MyApp, ClassAttendancePage, AlphabeticalStudentsPipe, FilterByPreferredClassTypePipe, SearchStudentComponent, StudentListComponent, GradeBadgeComponent, PrioritiseSelectedClassPipe],
      providers: [
        NavController,
        {provide: NavParams, useClass: NavParamsMock},
        {provide: StudentData, useClass: StudentDataMock},
        {provide: ClassData, useClass: ClassDataMock},
        Http,
        AttendanceService,
        ClassService,
        ClassEvents,
        ConnectionBackend,
        GradeService,
        StudentService,
        StudentEvents,
        ToastEvents,
        ErrorEvents
      ],
      imports: [
        IonicModule.forRoot(MyApp),
        HttpModule,
        EnvironmentsModule
      ]
    }).compileComponents();
  }));

    beforeEach(() => {
    fixture = TestBed.createComponent(ClassAttendancePage);
    de = fixture.debugElement.componentInstance;
    classAttendancePage    = fixture.componentInstance;
    studentDataMock = fixture.debugElement.injector.get(StudentData);
    classDataMock = fixture.debugElement.injector.get(ClassData);
    NavParamsMock.setParams("aclass", aclass);
  });

  afterEach(() => {
    fixture.destroy();
    classAttendancePage = null;
    de = null;
    el = null;
    NavParamsMock.resetParams();
  });

  it('is created', () => {
    expect(fixture).toBeTruthy();
    expect(classAttendancePage).toBeTruthy();
  });

  it('is initialised with a Students and a class', () => {
    const spy = spyOn(studentDataMock, 'getAllStudents').and.returnValue(
      Observable.of(students)
    );
    classAttendancePage.ngOnInit();
    fixture.detectChanges();
    expect(classAttendancePage.aclass).toEqual(aclass);

    expect(classAttendancePage.students).toEqual(students);

    expect(classAttendancePage.attended.length).toEqual(2);
    expect(classAttendancePage.notAttended.length).toEqual(1);
    expect(spy.calls.any()).toEqual(true);
  });

  it('addStudent should add student from the list', () => {
    const spy = spyOn(studentDataMock, 'getAllStudents').and.returnValue(
      Observable.of(students)
    );

    const spy2 = spyOn(classDataMock, 'getAllClasses').and.returnValue(
      Observable.of([aclass])
    );

    const spyClass = spyOn(classDataMock, 'addStudentToClass').and.returnValue(
      Observable.of([aclass])
    );

    classAttendancePage.ngOnInit();
    fixture.detectChanges();

    classAttendancePage.addStudent(rebekah);
    fixture.detectChanges();

    expect(spyClass.calls.count()).toEqual(1);
  });

  it('removeStudent should remove student from the list', () => {
    const spy = spyOn(studentDataMock, 'getAllStudents').and.returnValue(
      Observable.of(students)
    );

    const spy2 = spyOn(classDataMock, 'getAllClasses').and.returnValue(
      Observable.of([aclass])
    );

    const spyClass = spyOn(classDataMock, 'removeStudentFromClass').and.returnValue(
      Observable.of([aclass])
    );

    classAttendancePage.ngOnInit();
    fixture.detectChanges();

    classAttendancePage.removeStudent({student: rebekah, i: 0});
    fixture.detectChanges();

    expect(spyClass.calls.count()).toEqual(1);

  });

  it('deleteClass should delete a class', () => {
    const spy = spyOn(studentDataMock, 'getAllStudents').and.returnValue(
      Observable.of(students)
    );

    const spy2 = spyOn(classDataMock, 'deleteClass').and.returnValue(
      Observable.of([aclass])
    );

    classAttendancePage.ngOnInit();
    fixture.detectChanges();

    classAttendancePage.deleteClass();
    fixture.detectChanges();

    expect(spy2.calls.count()).toEqual(1);
  });

});