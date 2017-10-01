import {TestBed, ComponentFixture, async} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import {
    ActionSheetController, IonicModule, NavController, NavParams, ActionSheet, Alert,
    AlertController
} from 'ionic-angular';
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
import {ActionSheetControllerMock, ActionSheetMock, AlertControllerMock, AlertMock} from "ionic-mocks/src";
import {ClassService} from '../../../services/class/class.service';

let viewStudentPage: ViewStudentPage;
let fixture: ComponentFixture<ViewStudentPage>;
let de: DebugElement;
let el: HTMLElement;

describe('Page: View Student Page', () => {



    let actionSheetMock: ActionSheet;
    let alertMock: Alert;

    beforeEach(async(() => {
        actionSheetMock = ActionSheetMock.instance();
        alertMock = AlertMock.instance();

        TestBed.configureTestingModule({
            declarations: [MyApp, ViewStudentPage],
            providers: [
                NavController,
                {provide: NavParams, useClass: NavParamsMock},
                {provide: StudentData, useClass: StudentDataMock},
                {provide: ActionSheetController, useClass: ActionSheetControllerMock},
                {provide: AlertController, useClass: AlertControllerMock},
                Http,
                ConnectionBackend,
                GradeService,
                StudentService,
                StudentEvents,
                ClassService
            ],
            imports: [
                IonicModule.forRoot(MyApp),
                HttpModule
            ]
        }).compileComponents();
    }));

    afterEach(() => {
        fixture.destroy();
        viewStudentPage = null;
        de = null;
        el = null;
        NavParamsMock.resetParams();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ViewStudentPage);
        de = fixture.debugElement.componentInstance;
        viewStudentPage    = fixture.componentInstance;
    });

    it('is created', () => {
        expect(fixture).toBeTruthy();
        expect(viewStudentPage).toBeTruthy();
    });

    describe('Active Student', () =>{
        const name : Name = new Name('Rebekah', 'Apelt');
        const rebekah = new Student(name, 'hb030', '0000', 2, true, [], [], true, 'Adults');

        beforeEach(() => {
            NavParamsMock.setParams("student", rebekah);
            viewStudentPage.ngOnInit();
        });

        it('is initialised with a Student when a Student is set', () => {
            expect(viewStudentPage.student).toEqual(rebekah);
        });

        it('should call actionSheet create', () => {
            viewStudentPage.actionSheetCtrl = ActionSheetControllerMock.instance(actionSheetMock);
            viewStudentPage.presentActionSheet();
            expect(viewStudentPage.actionSheetCtrl.create).toHaveBeenCalled();
        });

        it('should call present on actionSheet', () => {
            viewStudentPage.actionSheetCtrl = ActionSheetControllerMock.instance(actionSheetMock);
            viewStudentPage.presentActionSheet();
            expect(actionSheetMock.present).toHaveBeenCalled();
        });

        it('should call actionSheet create', () => {
            viewStudentPage.alertCtrl = AlertControllerMock.instance(alertMock);
            viewStudentPage.presentConfirmDeactivate();
            expect(viewStudentPage.alertCtrl.create).toHaveBeenCalled();
        });

        it('should call present on actionSheet', () => {
            viewStudentPage.alertCtrl = AlertControllerMock.instance(alertMock);
            viewStudentPage.presentConfirmDeactivate();
            expect(alertMock.present).toHaveBeenCalled();
        });
    });

    describe('Inactive Student', () =>{

        const name2 : Name = new Name('Daniel', 'Blarg');
        const daniel = new Student(name2, 'hb031', '0000', 2, true, [], [], false, 'Adults');

        beforeEach(() => {
            NavParamsMock.setParams("student", daniel);
            viewStudentPage.ngOnInit();
        });

        it('is initialised with a Student when a Student is set', () => {
            expect(viewStudentPage.student).toEqual(daniel);
        });

        it('should call actionSheet create', () => {
            viewStudentPage.actionSheetCtrl = ActionSheetControllerMock.instance(actionSheetMock);
            viewStudentPage.presentActionSheet();
            expect(viewStudentPage.actionSheetCtrl.create).toHaveBeenCalled();
        });

        it('should call present on actionSheet', () => {
            viewStudentPage.actionSheetCtrl = ActionSheetControllerMock.instance(actionSheetMock);
            viewStudentPage.presentActionSheet();
            expect(actionSheetMock.present).toHaveBeenCalled();
        });

        it('should call actionSheet create', () => {
            viewStudentPage.alertCtrl = AlertControllerMock.instance(alertMock);
            viewStudentPage.presentConfirmReactivate();
            expect(viewStudentPage.alertCtrl.create).toHaveBeenCalled();
        });

        it('should call present on actionSheet', () => {
            viewStudentPage.alertCtrl = AlertControllerMock.instance(alertMock);
            viewStudentPage.presentConfirmReactivate();
            expect(alertMock.present).toHaveBeenCalled();
        });
    });
});