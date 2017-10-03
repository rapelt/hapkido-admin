import {TestBed, inject} from '@angular/core/testing';
import {
  HttpModule,
  XHRBackend
} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {StudentService} from "./student/student.service";
import {StudentData} from "./student/student.data";
import {StudentDataMock} from "./student/student.data.mock";
import {StudentEvents} from "./student/student.events";
import {ClassService} from "./class/class.service";
import {ClassData} from "./class/class.data";
import {ClassDataMock} from "./class/class.data.mock";
import {ClassEvents} from "./class/class.events";
import {AttendanceService} from "./attendance.service";
import {Name} from "../models/name";
import {Student} from "../models/student";
import {ToastEvents} from './toast.events';
import {ErrorEvents} from './error.events';
import {EnvironmentsModule} from '../app/enviroment/enviroment.module';

describe('Attendance Service', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule, EnvironmentsModule],
      providers: [
        StudentService,
        AttendanceService,
        ClassService,
        {provide: ClassData, useClass: ClassDataMock},
        {provide: StudentData, useClass: StudentDataMock},
        StudentEvents,
        ClassEvents,
        {provide: XHRBackend, useClass: MockBackend},
        ToastEvents,
        ErrorEvents
      ]
    });
  });

  const name1: Name = new Name('rebekah', 'apelt');
  const rebekah = new Student(name1, 'hb030', '0000', 2, true, [], [], true, false, 'Adults');

  const name2: Name = new Name('mark', 'higgins');
  const mark = new Student(name2, 'hb055', '0000', 2, true, [], [], true, false, 'Adults');

  const name3: Name = new Name('daniel', 'radcliffe');
  const daniel = new Student(name3, 'hb043', '0000', 2, true, [], [], true, false, 'Adults');

  let attendedIds = ['hb030', 'hb043'];
  let students = [rebekah, mark, daniel];

  it('addStudentToAClass should add student to a class',
    inject([AttendanceService], (attendanceService: AttendanceService) => {
      let attendance = attendanceService.getAttendedStudents(attendedIds, students);
      expect(attendance.length).toBe(2);
      expect(attendance[0].length).toBe(2);
      expect(attendance[1].length).toBe(1);

      expect(attendance[1]).toEqual([mark]);
      expect(attendance[0]).toEqual([rebekah, daniel]);

    }));
});