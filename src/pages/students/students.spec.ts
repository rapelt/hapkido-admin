import {TestBed, ComponentFixture, async, fakeAsync} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import {IonicModule, NavController, NavParams} from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import {StudentsPage} from "./students";
import {NavParamsMock} from "../../testHelperMethods/NavParamsMock";
import {StudentData} from "../../services/student/student.data";
import {ConnectionBackend, Http, HttpModule, RequestOptions} from "@angular/http";
import {StudentDataMock} from "../../services/student/student.data.mock";
import {Name} from "../../models/name";
import {Student} from "../../models/student";
import {Observable} from "rxjs";
import {GradeService} from "../../services/grade.service";
import {StudentService} from "../../services/student/student.service";
import {StudentEvents} from "../../services/student/student.events";

let studentsPage: StudentsPage;
let fixture: ComponentFixture<StudentsPage>;
let de: DebugElement;
let el: HTMLElement;

describe('Page: Students Page', () => {

    const name : Name = new Name('Rebekah', 'Apelt');
    const rebekah = new Student(name, 'hb030', '0000', 2, true, [], []);

    let studentDataMock: StudentDataMock;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp, StudentsPage],
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
        fixture = TestBed.createComponent(StudentsPage);
        studentsPage    = fixture.componentInstance;
        studentDataMock = fixture.debugElement.injector.get(StudentData);
    });

    afterEach(() => {
        fixture.destroy();
        studentsPage = null;
        de = null;
        el = null;
    });

    it('is created', () => {
        expect(fixture).toBeTruthy();
        expect(studentsPage).toBeTruthy();
    });

    it('is initialised with students', fakeAsync(() => {
        const spy = spyOn(studentDataMock, 'getAllStudents').and.returnValue(
            Observable.of([rebekah])
        );
        studentsPage.ngOnInit();
        fixture.detectChanges();
        expect(studentsPage.students).toEqual([rebekah]);
        expect(spy.calls.any()).toEqual(true);
    }));
});