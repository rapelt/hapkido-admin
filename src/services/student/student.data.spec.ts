import { TestBed, inject } from '@angular/core/testing';
import {
    HttpModule,
    Response,
    ResponseOptions,
    XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import {StudentData} from "./student.data";
import {Name} from "../../models/name";
import {Student} from "../../models/student";

describe('Student Data', () => {

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                StudentData,
                { provide: XHRBackend, useClass: MockBackend },
            ]
        });
    });

    describe('getAllStudents', () => {

        const name : Name = new Name('rebekah', 'apelt');
        const rebekah = new Student(name, 'hb030', '0000', 2, true, [], [], []);

        it('should return an Observable<Array<Student>>',
            inject([StudentData, XHRBackend], (studentService, mockBackend) => {

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
            inject([StudentData, XHRBackend], (studentService, mockBackend) => {

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