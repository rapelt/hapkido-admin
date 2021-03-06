import {TestBed, ComponentFixture, async} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import {IonicModule, NavController, NavParams} from 'ionic-angular';
import { MyApp } from '../../../app/app.component';
import {EditStudentPage} from "./editStudent";
import {NavParamsMock} from "../../../testHelperMethods/NavParamsMock";
import {StudentData} from "../../../services/student/student.data";
import {ConnectionBackend, Http, HttpModule} from "@angular/http";
import {Student} from "../../../models/student";
import {Name} from "../../../models/name";
import {StudentDataMock} from "../../../services/student/student.data.mock";
import {GradeService} from "../../../services/grade.service";
import {StudentService} from "../../../services/student/student.service";
import {StudentEvents} from "../../../services/student/student.events";
import {ToastEvents} from '../../../services/toast.events';
import {ErrorEvents} from '../../../services/error.events';
import {AuthService} from '../../../services/auth/auth.service';
import * as moment from 'moment';
import {EnvironmentsModule} from '../../../app/enviroment/enviroment.module';

let editStudentPage: EditStudentPage;
let fixture: ComponentFixture<EditStudentPage>;
let de: DebugElement;
let el: HTMLElement;

describe('Page: Edit Student Page', () => {

  const name : Name = new Name('Rebekah', 'Apelt');
  const rebekah = new Student(name, 'hb030', '0000', 2, true, [], [], true, false, 'Adults');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp, EditStudentPage],
      providers: [
        NavController,
        {provide: NavParams, useClass: NavParamsMock},
        {provide: StudentData, useClass: StudentDataMock},
        Http,
        ConnectionBackend,
        GradeService,
        StudentService,
        StudentEvents,
        ToastEvents,
        ErrorEvents,
        AuthService
      ],
      imports: [
        IonicModule.forRoot(MyApp),
        HttpModule,
        EnvironmentsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStudentPage);
    editStudentPage    = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    editStudentPage = null;
    de = null;
    el = null;
    NavParamsMock.resetParams();
  });

  xit('is initialised with a Student when a Student is set', () => {
    NavParamsMock.setParams("mode", "Edit");
    NavParamsMock.setParams("student", rebekah);
    editStudentPage.ngOnInit();
    expect(editStudentPage.mode).toEqual("Edit");
    expect(editStudentPage.student).toEqual(rebekah);
  });

  describe('Edit Student form for a new user', function () {
    const validFirstName = 'Rebekah';
    const validlastName = 'Apelt';
    const validHbid = 'hb035';
    const invalidFirstName = '';
    const invalidlastName = '';
    const invalidHbid = '';

    const validStudent = new Student(new Name(validFirstName, validlastName), validHbid, "0000", 0, false, [{date: moment(), grade: 0}], [], true, false, 'Adults');

    // create reusable function for a dry spec.
    function updateForm(firstname, lastname, hbid) {
      editStudentPage.studentForm.controls['firstname'].setValue(firstname);
      editStudentPage.studentForm.controls['lastname'].setValue(lastname);
      editStudentPage.studentForm.controls['hbid'].setValue(hbid);
    }

    beforeEach(() => {
      NavParamsMock.setParams("mode", "New");
      editStudentPage.ngOnInit();
    });

    it('isValid should be true when form is valid', () => {
      updateForm(validFirstName, validlastName, validHbid);
      expect(editStudentPage.studentForm.valid).toBeTruthy()
    });
    it('isValid should be false when form is invalid', () => {
      updateForm(invalidFirstName, invalidlastName, invalidHbid);
      expect(editStudentPage.studentForm.valid).toBeFalsy();
    });
    xit('should update model on submit', () => {
      updateForm(validFirstName, validlastName, validHbid);
      editStudentPage.onSubmit();
      expect(editStudentPage.student).toEqual(validStudent);
    });

    it('should have a disabled pin number field', () => {
      expect(editStudentPage.studentForm.controls.pin.disabled).toBeTruthy();
    });
  });
});