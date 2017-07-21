import { TestBed, async, inject } from '@angular/core/testing';
import {
    HttpModule,
    Http,
    Response,
    ResponseOptions,
    XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import {StudentService} from "./students.service";
import {Name} from "../models/name";
import {Student} from "../models/student";

describe('Student Service', () => {

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                StudentService,
                { provide: XHRBackend, useClass: MockBackend },
            ]
        });
    });

    describe('getAllStudents', () => {

        const name : Name = new Name('rebekah', 'apelt');
        const rebekah = new Student(name, 'hb030', '0000', 2, true, [], [], []);

        it('should return an Observable<Array<Student>>',
            inject([StudentService, XHRBackend], (studentService, mockBackend) => {

                const mockResponse = [rebekah];

                mockBackend.connections.subscribe((connection) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(mockResponse)
                    })));
                });

                studentService.getAllStudents().subscribe((students) => {
                    expect(students.length).toBe(1);
                    expect(students[0].name.firstname).toBe('rebekah');
                });

            }));
    });

    describe('getStudent', () => {

        const name : Name = new Name('rebekah', 'apelt');
        const rebekah = new Student(name, 'hb030', '0000', 2, true, [], [], []);

        it('should return an Observable<Student>',
            inject([StudentService, XHRBackend], (studentService, mockBackend) => {

                const mockResponse = rebekah;

                mockBackend.connections.subscribe((connection) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(mockResponse)
                    })));
                });

                studentService.getStudent().subscribe((student) => {
                    expect(student.name.firstname).toBe('rebekah');
                });

            }));
    });
});