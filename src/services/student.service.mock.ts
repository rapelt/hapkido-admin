import {Student} from "../models/student";
import {Observable, Observer} from "rxjs";
export class StudentServiceMock {
    static students: Student[] = [];

    getStudent(): Observable<Student> {
        return Observable.of(StudentServiceMock.students[0]);
    }

    getAllStudents(): Observable<Student []> {
        return Observable.of(StudentServiceMock.students);
    }

    updateStudent(student: Student): Observable<Student> {
        return Observable.of(StudentServiceMock.students[0]);
    }

    createStudent(student: Student): Observable<Student> {
        return Observable.of(StudentServiceMock.students[0]);
    }
}