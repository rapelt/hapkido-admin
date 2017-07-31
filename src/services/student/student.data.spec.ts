import {TestBed, inject} from '@angular/core/testing';
import {
  HttpModule,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {StudentData} from "./student.data";
import {Name} from "../../models/name";
import {Student} from "../../models/student";

describe('Student Data', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        StudentData,
        {provide: XHRBackend, useClass: MockBackend},
      ]
    });
  });

  const name: Name = new Name('rebekah', 'apelt');
  const rebekah = new Student(name, 'hb030', '0000', 2, true, [], [], []);

  it('getStudent should return an Observable<Student>',
    inject([StudentData, XHRBackend], (studentData, mockBackend) => {

      const mockResponse = rebekah;

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      studentData.getStudent().subscribe((student) => {
        expect(student.name.firstname).toBe('rebekah');
      });
    })
  );

  it('getAllStudents should return an Observable<Array<Student>>',
    inject([StudentData, XHRBackend], (studentData, mockBackend) => {

      const mockResponse = [rebekah];

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      studentData.getAllStudents().subscribe((students) => {
        expect(students.length).toBe(1);
        expect(students[0].name.firstname).toBe('rebekah');
      });
    }));

  it('createStudent should return an Observable with a student ID',
    inject([StudentData, XHRBackend], (studentData, mockBackend) => {

      const mockResponse = {studentId: "98237492"};

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      studentData.createStudent(rebekah).subscribe((student) => {
        expect(student.studentId).toBe('98237492');
      });
    }));

  it('updateStudent should return an Observable with a student id',
    inject([StudentData, XHRBackend], (studentData, mockBackend) => {

      const mockResponse = {studentId: "98237492"};

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      studentData.updateStudent(rebekah).subscribe((student) => {
        expect(student.studentId).toBe('98237492');
      });
    }));

  it('deleteStudent should return an Observable with the message student deleted',
    inject([StudentData, XHRBackend], (studentData, mockBackend) => {

      const mockResponse = {message: "student deleted"};

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      studentData.getStudent(rebekah.hbId).subscribe((message) => {
        expect(message.message).toBe('student deleted');
      });
    }));
});