import {Observable} from "rxjs";
import {Class} from "../../models/class";
import * as moment from "moment";

export class ClassDataMock {

  static classes: Class[] = [
    new Class("123", "", [], false, moment(new Date(new Date().setDate(new Date().getDate() + 7))), ""),
    new Class("124", "", [], false, moment(new Date(new Date().setDate(new Date().getDate() + 5))), ""),
    new Class("125", "", [], false, moment(new Date(new Date().setDate(new Date().getDate() + 123))), ""),
    new Class("126", "", [], false, moment(new Date(new Date().setDate(new Date().getDate() - 12))), ""),
    new Class("127", "", [], false, moment(new Date(new Date().setDate(new Date().getDate() - 1))), "")
  ];
  userUrl: string = 'http://localhost/dev/class/';

  getClass(classid: string): Observable<Class> {
    return Observable.of(ClassDataMock.classes[0]);
  }

  getAllClasses(): Observable<Class []> {
    return Observable.of(ClassDataMock.classes);
  }

  updateClass(aclass: Class) {
    return Observable.of(ClassDataMock.classes[0]);
  }

  createClasses(classes: Array<Class>) {
    return Observable.of(ClassDataMock.classes);
  }

  deleteClass(classid: string) {
    return Observable.of(ClassDataMock.classes[0]);
  }

  addStudentToClass(studentId: string, classId: string){
    return Observable.of(ClassDataMock.classes[0]);
  }

  removeStudentFromClass(studentId: string, classId: string){
    return Observable.of(ClassDataMock.classes[0]);
  }
}