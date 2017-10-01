import {Student} from "../../models/student";
import {Observable} from "rxjs";
import {Name} from "../../models/name";
export class StudentDataMock {

    static students: Student[] = [new Student(new Name('rebekah', 'apelt'), 'hb030', '0000', 2, true, [], [], true, false, 'Adults'), new Student(new Name('mark', 'higgins'), 'hb031', '0000', 2, true, [], [], false, false, 'Adults')];
    userUrl: string = 'http://localhost/dev/student/';

    getStudent(hbid: string): Observable<Student> {
        return Observable.of(StudentDataMock.students[0]);
    }

    getAllStudents(): Observable<Student []> {
        return Observable.of(StudentDataMock.students);
    }

    updateStudent(student: Student) {
        return Observable.of(StudentDataMock.students[0]);
    }

    createStudent(student: Student) {
        return Observable.of(StudentDataMock.students[0]);
    }

    deleteStudent(hbId: string) {
        return Observable.of(StudentDataMock.students[0]);
    }

    deactivateStudent(hbId: string) {
        return Observable.of(StudentDataMock.students[0]);
    }

    reactivateStudent(hbId: string) {
        return Observable.of(StudentDataMock.students[0]);
    }
}