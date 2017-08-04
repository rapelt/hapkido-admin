import {Student} from "../models/student";
import * as _ from "underscore";
import {Injectable} from "@angular/core";
import {StudentService} from "./student/student.service";
import {ClassService} from "./class/class.service";

@Injectable()
export class AttendanceService {

  constructor(private studentService: StudentService, private classService: ClassService) {}

  getAttendedStudents(attendedIds: Array<string>, students: Array<Student>): Array<Array<Student>>{
    let attended: any;

    attended = _.partition(students, (student) =>{
      return _.find(attendedIds, (id) => {
        return id === student.hbId;
      });
    });

    return attended;
  }

  addStudentToAClass(studentId: string, classId: string){
    this.studentService.addClass(studentId, classId);
    this.classService.addStudent(studentId, classId);
  }

  removeStudentFromAClass(studentId: string, classId: string){
    this.studentService.removeClass(studentId, classId);
    this.classService.removeStudent(studentId, classId);
  }
}