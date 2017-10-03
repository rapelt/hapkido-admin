import {TestBed, ComponentFixture, async} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import {IonicModule, NavController, NavParams} from 'ionic-angular';
import { MyApp } from '../../../app/app.component';
import {EditStudentPage} from "./editStudent";
import {NavParamsMock} from "../../../testHelperMethods/NavParamsMock";
import {StudentData} from "../../../services/student/student.data";
import {ConnectionBackend, Http, HttpModule} from "@angular/http";
import {StudentDataMock} from "../../../services/student/student.data.mock";
import {GradeService} from "../../../services/grade.service";
import {StudentService} from "../../../services/student/student.service";
import {StudentEvents} from "../../../services/student/student.events";
import {EnvironmentsModule} from '../../../app/enviroment/enviroment.module';
import {ErrorEvents} from '../../../services/error.events';
import {ToastEvents} from '../../../services/toast.events';
import {AuthService} from '../../../services/auth/auth.service';

let editStudentPage: EditStudentPage;
let fixture: ComponentFixture<EditStudentPage>;
let de: DebugElement;
let el: HTMLElement;

describe('Page: Edit Student Page', () => {

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
              ErrorEvents,
              ToastEvents,
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

    it('is created', () => {
        expect(fixture).toBeTruthy();
        expect(editStudentPage).toBeTruthy();
    });
});