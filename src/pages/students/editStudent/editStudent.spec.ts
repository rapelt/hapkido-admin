import {TestBed, ComponentFixture, async} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import {IonicModule, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import { MyApp } from '../../../app/app.component';
import {EditStudentPage} from "./editStudent";
import {NavParamsMock} from "../../../testHelperMethods/NavParamsMock";
import {StudentService} from "../../../services/students.service";
import {ConnectionBackend, Http, HttpModule} from "@angular/http";
import {Student} from "../../../models/student";
import {Name} from "../../../models/name";
import {StudentServiceMock} from "../../../services/student.service.mock";
import {Observable} from "rxjs";

let editStudentPage: EditStudentPage;
let fixture: ComponentFixture<EditStudentPage>;
let de: DebugElement;
let el: HTMLElement;

describe('Page: Edit Student Page', () => {

    const name : Name = new Name('Rebekah', 'Apelt');
    const rebekah = new Student(name, 'hb030', '0000', 2, true, [], [], []);
    let studentServiceMock: StudentServiceMock;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp, EditStudentPage],
            providers: [
                NavController,
                {provide: NavParams, useClass: NavParamsMock},
                {provide: StudentService, useClass: StudentServiceMock},
                Http,
                ConnectionBackend
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

    it('is created', () => {
        expect(fixture).toBeTruthy();
        expect(editStudentPage).toBeTruthy();
    });

    it('is initialised with the mode "New" when no mode is set', () => {
        NavParamsMock.setParams("mode", "New");
        editStudentPage.ngOnInit();
        expect(editStudentPage.mode).toEqual("New");
    });

    it('is initialised with a Student when a Student is set', () => {
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

        const validStudent = new Student(new Name(validFirstName, validlastName), validHbid, "0000", 0, false, [], [], []);

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
        it('should update model on submit', () => {
            updateForm(validFirstName, validlastName, validHbid);
            editStudentPage.onSubmit();
            expect(editStudentPage.student).toEqual(validStudent);
        });

        it('should have a disabled pin number field', () => {
            expect(editStudentPage.studentForm.controls.pin.disabled).toBeTruthy();
        });
    });

    describe('Edit Student form for a edit user', function () {
        const validFirstName = 'Joe';
        const validlastName = 'Blogs';
        const invalidFirstName = '';
        const invalidlastName = '';

        const updatedStudent = new Student(new Name(validFirstName, validlastName), 'hb030', '0000', 2, true, [], [], []);

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