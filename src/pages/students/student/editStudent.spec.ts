import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import {IonicModule, NavController, NavParams} from 'ionic-angular';
import { MyApp } from '../../../app/app.component';
import {StudentPage} from "./editStudent";
import {NavParamsMock} from "../../../testHelperMethods/NavParamsMock";
import {StudentService} from "../../../services/students.service";
import {ConnectionBackend, Http, HttpModule} from "@angular/http";
import {Student} from "../../../models/student";
import {Name} from "../../../models/name";

let studentPage: StudentPage;
let fixture: ComponentFixture<StudentPage>;
let de: DebugElement;
let el: HTMLElement;

describe('Page: Edit Student Page', () => {

    const name : Name = new Name('Rebekah', 'Apelt');

    const rebekah = new Student(name, 'hb030', '0000', 2, true, [], [], []);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp, StudentPage],
            providers: [
                NavController,
                {provide: NavParams, useClass: NavParamsMock},
                StudentService,
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
        fixture = TestBed.createComponent(StudentPage);
        studentPage    = fixture.componentInstance;
    });

    afterEach(() => {
        fixture.destroy();
        studentPage = null;
        de = null;
        el = null;
        NavParamsMock.resetParams();
    });

    it('is created', () => {
        expect(fixture).toBeTruthy();
        expect(studentPage).toBeTruthy();
    });

    it('is initialised with the mode "Edit"', () => {
        NavParamsMock.setParams("mode", "Edit");
        studentPage.ngOnInit();
        expect(studentPage.mode).toEqual("Edit");
    });

    it('is initialised with the mode "New" when no mode is set', () => {
        studentPage.ngOnInit();
        expect(studentPage.mode).toEqual("New");
    });

    it('is initialised with a student when a student is set', () => {
        NavParamsMock.setParams("student", rebekah);

        studentPage.ngOnInit();
        expect(studentPage.student).toEqual(rebekah);
    });
});