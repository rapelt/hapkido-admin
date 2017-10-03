import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {IonicModule, NavController} from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import {HomePage} from "./home";
import {EnvironmentsModule} from "../../app/enviroment/enviroment.module";
import {EnvVariables} from "../../app/enviroment/enviroment.token";
import {ErrorComponent} from '../../components/error/error';
import {ToastEvents} from '../../services/toast.events';
import {ToastComponent} from '../../components/toast/toast';
import {AttendanceComponent} from '../../components/attendance/attendance';
import {ClassService} from '../../services/class/class.service';
import {StudentService} from '../../services/student/student.service';
import {StudentData} from '../../services/student/student.data';
import {ClassData} from '../../services/class/class.data';
import {StudentDataMock} from '../../services/student/student.data.mock';
import {ClassDataMock} from '../../services/class/class.data.mock';
import {ClassEvents} from '../../services/class/class.events';
import {ErrorEvents} from '../../services/error.events';
import {StudentEvents} from '../../services/student/student.events';

let comp: HomePage;
let fixture: ComponentFixture<HomePage>;
let de: DebugElement;
let el: HTMLElement;

describe('Page: Home Page', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp, HomePage, ErrorComponent, ToastComponent, AttendanceComponent],
            providers: [
              {provide: StudentData, useClass: StudentDataMock},
              {provide: ClassData, useClass: ClassDataMock},
                NavController,
                ClassService,
                StudentService,
              ClassEvents,
              ErrorEvents,
              ToastEvents,
              StudentEvents
            ],
            imports: [
                IonicModule.forRoot(MyApp),
                EnvironmentsModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomePage);
        comp    = fixture.componentInstance;
    });

    afterEach(() => {
        fixture.destroy();
        comp = null;
        de = null;
        el = null;
    });

    it('is created', () => {
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
    });

    it('initialises with a title of Home', () => {
        expect(comp['title']).toEqual('Home');
    });

    it('can set the title to a supplied value', () => {
        de = fixture.debugElement.query(By.css('ion-title'));
        el = de.nativeElement;

        comp.changeTitle('Your Page');
        fixture.detectChanges();
        expect(comp['title']).toEqual('Your Page');
        expect(el.textContent).toContain('Your Page');
    });

});