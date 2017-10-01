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
        StudentEvents
      ],
      imports: [
        IonicModule.forRoot(MyApp),
        HttpModule
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

  it('is initialised with a Student when a Student is set', () => {
    NavParamsMock.setParams("mode", "Edit");
    NavParamsMock.setParams("student", rebekah);
    editStudentPage.ngOnInit();
    expect(editStudentPage.mode).toEqual("Edit");
    expect(editStudentPage.student).toEqual(rebekah);
  });

  describe('Edit Student form for a edit user', function () {
    const validFirstName = 'Joe';
    const validlastName = 'Blogs';
    const invalidFirstName = '';
    const invalidlastName = '';

    const updatedStudent = new Student(new Name(validFirstName, validlastName), 'hb030', '0000', 2, true, [], [], true, false, 'Adults');

    // create reusable function for a dry spec.
    function updateForm(firstname, lastname) {
      editStudentPage.studentForm.controls['firstname'].setValue(firstname);
      editStudentPage.studentForm.controls['lastname'].setValue(lastname);
    }

    beforeEach(() => {
      NavParamsMock.setParams("mode", "Edit");
      NavParamsMock.setParams("student", rebekah);
      editStudentPage.ngOnInit();
    });

    it('isValid should be true when form is valid', () => {
      updateForm(validFirstName, validlastName);
      expect(editStudentPage.studentForm.valid).toBeTruthy()
    });
    it('isValid should be false when form is invalid', () => {
      updateForm(invalidFirstName, invalidlastName);
      expect(editStudentPage.studentForm.valid).toBeFalsy();
    });
    it('should update model on submit', () => {
      updateForm(validFirstName, validlastName);
      editStudentPage.onSubmit();
      fixture.detectChanges();

      expect(editStudentPage.student).toEqual(updatedStudent);
    });

    it('should have a disabled pin number field', () => {
      expect(editStudentPage.studentForm.controls.hbid.disabled).toBeTruthy();
    });
  });
});