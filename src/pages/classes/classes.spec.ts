import {TestBed, ComponentFixture, async, fakeAsync} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import {IonicModule, NavController, NavParams} from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import {NavParamsMock} from "../../testHelperMethods/NavParamsMock";
import {ConnectionBackend, Http, HttpModule, RequestOptions} from "@angular/http";
import {ClassesPage} from "./classes";
import {ClassData} from "../../services/class/class.data";
import {ClassDataMock} from "../../services/class/class.data.mock";
import {SortDatesPipe} from "../../pipes/sort-dates/sort-dates";
import {ClassService} from "../../services/class/class.service";
import {ClassEvents} from "../../services/class/class.events";
import {Observable} from "rxjs";
import {Class} from "../../models/class";
import * as moment from "moment";
import {tick} from "@angular/core/testing";
import {EnvironmentsModule} from '../../app/enviroment/enviroment.module';
import {ErrorEvents} from '../../services/error.events';
import {ToastEvents} from '../../services/toast.events';

let classesPage: ClassesPage;
let fixture: ComponentFixture<ClassesPage>;
let de: DebugElement;
let el: HTMLElement;
let classDataMock: ClassData;

describe('Page: Classes Page', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp, ClassesPage, SortDatesPipe],
      providers: [
        NavController,
        {provide: NavParams, useClass: NavParamsMock},
        {provide: ClassData, useClass: ClassDataMock},
        Http,
        ClassService,
        ClassEvents,
        ConnectionBackend,
        ErrorEvents,
        ToastEvents
      ],
      imports: [
        IonicModule.forRoot(MyApp),
        HttpModule,
        EnvironmentsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesPage);
    classesPage    = fixture.componentInstance;
    classDataMock = fixture.debugElement.injector.get(ClassData);
  });

  afterEach(() => {
    fixture.destroy();
    classesPage = null;
    de = null;
    el = null;
  });

  var now1 = new Date();
  var now2 = new Date();
  var now3 = new Date();
  var now4 = new Date();
  var now5 = new Date();

  const class1 = new Class("123", "", [], false, moment(new Date(now1.setDate(now1.getDate() + 7))), "");
  const class2 = new Class("124", "", [], false, moment(new Date(now2.setDate(now2.getDate() + 5))), "");
  const class3 = new Class("125", "", [], false, moment(new Date(now3.setDate(now3.getDate() + 123))), "");
  const class4 = new Class("126", "", [], false, moment(new Date(now4.setDate(now4.getDate() - 12))), "");
  const class5 = new Class("127", "", [], false, moment(new Date(now5.setDate(now5.getDate() - 1))), "");

  let classes = [class1, class2, class3, class4, class5];

  it('is created', () => {
    expect(fixture).toBeTruthy();
    expect(classesPage).toBeTruthy();
  });

  it('is initialised', fakeAsync(() => {
    const spy = spyOn(classDataMock, 'getAllClasses').and.returnValue(
      Observable.of(classes)
    );
    classesPage.ngOnInit();
    tick();

    fixture.detectChanges();

    expect(classesPage.allClasses.length).toBe(5);
    expect(classesPage.futureClasses.length).toBe(3);
    expect(classesPage.nextClass).toBe(class2);
    expect(spy.calls.any()).toEqual(true);
  }));

  it('is initialised', fakeAsync(() => {
    const spy = spyOn(classDataMock, 'deleteClass').and.returnValue(
      Observable.of(classes)
    );
    classesPage.onDelete("asdasd");
    tick();

    fixture.detectChanges();

    expect(spy.calls.any()).toEqual(true);
  }));
});