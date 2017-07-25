import {TestBed, ComponentFixture, async} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import {IonicModule, NavController, NavParams} from 'ionic-angular';
import { MyApp } from '../../../app/app.component';
import {NavParamsMock} from "../../../testHelperMethods/NavParamsMock";
import {StudentData} from "../../../services/student/student.data";
import {ConnectionBackend, Http, HttpModule} from "@angular/http";
import {Student} from "../../../models/student";
import {Name} from "../../../models/name";
import {StudentDataMock} from "../../../services/student/student.data.mock";
import {ViewStudentPage} from "./viewStudent";
import {GradeService} from "../../../services/grade.service";
import {StudentService} from "../../../services/student/student.service";
import {StudentEvents} from "../../../services/student/student.events";
import {By} from "@angular/platform-browser";

let viewStudentPage: ViewStudentPage;
let fixture: ComponentFixture<ViewStudentPage>;
let de: DebugElement;
let el: HTMLElement;

describe('Page: View Student Page', () => {

    const name : Name = new Name('Rebekah', 'Apelt');
    const rebekah = new Student(name, 'hb030', '0000', 2, true, [], [], []);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp, ViewStudentPage],
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
        fixture = TestBed.createComponent(ViewStudentPage);
        de = fixture.debugElement.componentInstance;
        viewStudentPage    = fixture.componentInstance;
    });

    afterEach(() => {
        fixture.destroy();
        viewStudentPage = null;
        de = null;
        el = null;
        NavParamsMock.resetParams();
    });

    it('is created', () => {
        expect(fixture).toBeTruthy();
        expect(viewStudentPage).toBeTruthy();
    });

    it('is initialised with a Student when a Student is set', () => {
        NavParamsMock.setParams("student", rebekah);
        viewStudentPage.ngOnInit();
        expect(viewStudentPage.student).toEqual(rebekah);
    });

    it('The actionsheet is presented', async(() => {
        //spyOn(viewStudentPage, 'presentActionSheet');
        //console.log(fixture.debugElement.nativeElement);

        let button = fixture.debugElement.query(By.css("#UT-actionsheet")).nativeElement;
        console.log(button);
        button.click();

        /*fixture.whenStable().then(() => {
            expect(viewStudentPage.presentActionSheet).toHaveBeenCalled();
        })*/
    }));

});