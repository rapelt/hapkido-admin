import {TestBed, ComponentFixture, async, fakeAsync, tick} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import {IonicModule, NavController, NavParams} from 'ionic-angular';
import {ConnectionBackend, Http, HttpModule, RequestOptions} from "@angular/http";
import {AddClassesPage} from "./addClasses";
import {ClassService} from "../../../services/class/class.service";
import {ClassData} from "../../../services/class/class.data";
import {ClassDataMock} from "../../../services/class/class.data.mock";
import {NavParamsMock} from "../../../mocks";
import {MyApp} from "../../../app/app.component";
import {IonCalendar} from "../../../components/calendar/calendar";
import {ClassEvents} from "../../../services/class/class.events";
import {Observable} from "rxjs";
import {Class} from "../../../models/class";
import * as moment from "moment";
import {FormArray, FormControl} from "@angular/forms";

let addClassesPage: AddClassesPage;
let fixture: ComponentFixture<AddClassesPage>;
let de: DebugElement;
let el: HTMLElement;
let classDataMock: ClassData;

describe('Page: AddClasses Page', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp, AddClassesPage, IonCalendar],
      providers: [
        NavController,
        {provide: NavParams, useClass: NavParamsMock},
        {provide: ClassData, useClass: ClassDataMock},
        Http,
        ClassService,
        ClassEvents,
        ConnectionBackend
      ],
      imports: [
        IonicModule.forRoot(MyApp),
        HttpModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClassesPage);
    addClassesPage    = fixture.componentInstance;
    classDataMock = fixture.debugElement.injector.get(ClassData);
    addClassesPage.ngOnInit();
  });

  afterEach(() => {
    fixture.destroy();
    addClassesPage = null;
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

  let datesMoments = [class1.date, class2.date, class3.date, class4.date, class5.date];

  const date1 = new Date(now2.setDate(now2.getDate() + 5));
  const date2 = new Date(now2.setDate(now2.getDate() + 12));
  const date3 = new Date(now2.setDate(now2.getDate() + 23));

  let datesDates = [date1, date2, date3];


  it('is created', () => {
    expect(fixture).toBeTruthy();
    expect(addClassesPage).toBeTruthy();
  });

  it('is initialised', fakeAsync(() => {
    const spy = spyOn(classDataMock, 'getAllClasses').and.returnValue(
      Observable.of(classes)
    );
    addClassesPage.ngOnInit();
    tick();

    fixture.detectChanges();

    expect(addClassesPage.classForm).not.toBeNull();
    expect(addClassesPage.classForm.controls.classes).not.toBeNull();

    expect(addClassesPage.preselectedDates).toEqual(datesMoments);
    expect(spy.calls.any()).toEqual(true);
  }));

  it('onPeriodChange is called with dates and updates dates', fakeAsync(() => {
    addClassesPage.onPeriodChange({selectedValues: datesDates});

    expect(addClassesPage.selectedDates).toEqual(datesDates);
  }));

  it('addClass adds a new control to the form', fakeAsync(() => {
    expect((<FormArray>addClassesPage.classForm.controls.classes).length).toBe(1);
    addClassesPage.addClass();
    expect((<FormArray>addClassesPage.classForm.controls.classes).length).toBe(2);
  }));

  it('removeClass removes a control to the form', fakeAsync(() => {
    addClassesPage.addClass();
    addClassesPage.addClass();
    expect((<FormArray>addClassesPage.classForm.controls.classes).length).toBe(3);
    addClassesPage.removeClass(2);
    expect((<FormArray>addClassesPage.classForm.controls.classes).length).toBe(2);
  }));

  it('onsubmit creates a lot of new classes', fakeAsync(() => {
    addClassesPage.onPeriodChange({selectedValues: datesDates});

    (<FormArray>addClassesPage.classForm.controls.classes).controls[0].setValue({classType: "Adults", startTime: "17:00", isGrading: false});

    const spy = spyOn(classDataMock, 'createClasses').and.returnValue(
      Observable.of(classes)
    );
    addClassesPage.onSubmit();
    tick();

    fixture.detectChanges();

    expect(spy.calls.count()).toEqual(1);
  }));
});