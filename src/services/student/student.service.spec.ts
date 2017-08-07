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

describe('Student Service', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule, EnvironmentsModule],
      providers: [
        StudentService,
        {provide: StudentData, useClass: StudentDataMock},
        StudentEvents,
        {provide: XHRBackend, useClass: MockBackend},
      ]
    });
  });

  it('getAllStudents should return', inject([StudentService], (studentService: StudentService) => {
    studentService.getAllStudents();
    expect(studentService.getStudents().length).toBe(2);
  }));
});