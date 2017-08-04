import {TestBed, ComponentFixture, async} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import {IonicModule, NavController, NavParams} from 'ionic-angular';
import {SelectClassPage} from "./selectClass";
import {MyApp} from "../../app/app.component";
import {ClassData} from "../../services/class/class.data";
import {ClassDataMock} from "../../services/class/class.data.mock";
import {NavParamsMock} from "../../mocks";
import {ConnectionBackend, Http, HttpModule} from "@angular/http";
import {ClassService} from "../../services/class/class.service";
import {ClassEvents} from "../../services/class/class.events";
import {IonCalendar} from "../../components/calendar/calendar";
import {Observable} from "rxjs";
import {Class} from "../../models/class";
import * as moment from "moment";
let selectClassPage: SelectClassPage;
let fixture: ComponentFixture<SelectClassPage>;
let de: DebugElement;
let el: HTMLElement;

describe('Page: Edit Student Page', () => {

  let aclass = new Class("126", "", ['hb030', 'hb043'], false, moment(new Date(new Date().setDate(new Date().getDate() - 12))), "");

  let classDataMock: ClassDataMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp, SelectClassPage, IonCalendar],
      providers: [
        NavController,
        {provide: NavParams, useClass: NavParamsMock},
        {provide: ClassData, useClass: ClassDataMock},
        Http,
        ConnectionBackend,
        ClassService,
        ClassEvents
      ],
      imports: [
        IonicModule.forRoot(MyApp),
        HttpModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectClassPage);
    classDataMock = fixture.debugElement.injector.get(ClassData);
    selectClassPage = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    selectClassPage = null;
    de = null;
    el = null;
  });

  it('is created', () => {
    expect(fixture).toBeTruthy();
    expect(selectClassPage).toBeTruthy();
  });

  it('is initialised with a Students and a class', () => {
    const spy = spyOn(classDataMock, 'getAllClasses').and.returnValue(
      Observable.of([aclass])
    );
    selectClassPage.ngOnInit();
    fixture.detectChanges();

    expect(selectClassPage.allClasses).toEqual([aclass]);

    expect(spy.calls.any()).toEqual(true);
  });
});