import {TestBed, inject} from '@angular/core/testing';
import {
  HttpModule,
  XHRBackend
} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {StudentService} from "./student.service";
import {StudentData} from "./student.data";
import {StudentEvents} from "./student.events";
import {StudentDataMock} from "./student.data.mock";
import {EnvironmentsModule} from "../../app/enviroment/enviroment.module";
import {ToastEvents} from '../toast.events';
import {ErrorEvents} from '../error.events';

describe('Student Service', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule, EnvironmentsModule],
      providers: [
        StudentService,
        {provide: StudentData, useClass: StudentDataMock},
        StudentEvents,
        {provide: XHRBackend, useClass: MockBackend},
        ToastEvents,
        ErrorEvents
      ]
    });
  });

  it('getAllStudents should return', inject([StudentService], (studentService: StudentService) => {
    studentService.getAllStudents();
    expect(studentService.getStudents().length).toBe(2);
  }));

  it('getStudentsActiveState should return an array of 2 arrays with 1 of active students and the other of inactive students', inject([StudentService], (studentService: StudentService) => {
    studentService.getAllStudents();
    let studentStatus = studentService.getStudentsActiveState(studentService.getStudents());
    expect(studentStatus.length).toBe(2);
    expect(studentStatus[0][0]).toBeTruthy();
    expect(studentStatus[1][0].isActive).toBeFalsy()
  }));
});