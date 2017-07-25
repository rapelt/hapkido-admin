import {Student} from "../../models/student";
import {Observable} from "rxjs";
export class StudentDataMock {
    static students: Student[] = [];

    getStudent(hbid: string): Observable<Student> {
        return Observable.of(StudentDataMock.students[0]);
    }

    getAllStudents(): Observable<Student []> {
        return Observable.of(StudentDataMock.students);
    }

    updateStudent(student: Student): Observable<Student> {
        return Observable.of(StudentDataMock.students[0]);
    }

    createStudent(student: Student): Observable<Student> {
        return Observable.of(StudentDataMock.students[0]);
    }
}