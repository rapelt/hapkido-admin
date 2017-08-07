import {TestBed, inject} from '@angular/core/testing';
import {
  HttpModule,
  XHRBackend
} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {ClassService} from "./class.service";
import {Class} from "../../models/class";
import * as moment from 'moment';
import {ClassData} from "./class.data";
import {ClassEvents} from "./class.events";
import {EnvironmentsModule} from "../../app/enviroment/enviroment.module";

describe('Student Service', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule, EnvironmentsModule],
      providers: [
        ClassService,
        ClassData,
        ClassEvents,
        {provide: XHRBackend, useClass: MockBackend},
      ]
    });
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

  it('getsNextClass should return the next class', inject([ClassService], (classService: ClassService) => {
    expect(classService.getNextClass(classes)).toBe(class2);
  }));

  it('getFutureClasses should return an array of future classes', inject([ClassService], (classService: ClassService) => {
    const futureClasses = classService.getFutureClasses(classes);

    expect(futureClasses.length).toBe(3);
    expect(futureClasses[0].classId).toBe(class1.classId);
    expect(futureClasses[1].classId).toBe(class2.classId);
    expect(futureClasses[2].classId).toBe(class3.classId);
  }));

  it('getAllDates should return all classes as Dates', inject([ClassService], (classService: ClassService) => {
    const allDates = classService.getAllDates(classes);

    expect(allDates.length).toBe(5);
    expect(allDates[0]).toBe(class1.date);
    expect(allDates[1]).toBe(class2.date);
    expect(allDates[2]).toBe(class3.date);
    expect(allDates[3]).toBe(class4.date);
    expect(allDates[4]).toBe(class5.date);
  }));

  it('getClassesOnDay should return classes for that day', inject([ClassService], (classService: ClassService) => {
    var newDate = new Date();

    const date = new Date(newDate.setDate(newDate.getDate() + 7));

    const allClasses = classService.getClassesOnDay(date, classes);

    expect(allClasses.length).toBe(1);
    expect(allClasses[0]).toBe(class1);
  }));
});