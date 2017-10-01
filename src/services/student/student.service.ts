import {Student} from "../../models/student";
import {Injectable} from "@angular/core";
import {StudentData} from "./student.data";
import {StudentEvents} from "./student.events";
import * as _ from "underscore";
import {ToastEvents} from '../toast.events';
import {ErrorEvents} from '../error.events';

@Injectable()
export class StudentService {
  private students: Student[] = [];

  constructor(private studentData: StudentData, private studentEvents: StudentEvents, private toastEvents: ToastEvents, private errorEvents: ErrorEvents) {}

  createStudent(student: Student){
    this.studentData.createStudent(student).subscribe(response => {
      this.toastEvents.updateToast.next('Student Created');

      this.getAllStudents();
    }, error => {
      console.log(error);
    });
  }

  getStudents(){
    return this.students;
  }

  getAllStudents(){
    this.studentData.getAllStudents().subscribe((studentsList: Student []) => {
      this.students = studentsList;
      this.studentEvents.studentsUpdated.next(this.students);
    }, (error) => {
      console.log(error);
      this.errorEvents.updateError.next("Please check your internet connection. We could not get your student list");
    });
  }

  deleteStudent(hbid: string){
    this.studentData.deleteStudent(hbid).subscribe(response => {
      this.toastEvents.updateToast.next('Student Deleted');
      this.getAllStudents();
    }, error => {
      console.log(error);
      this.errorEvents.updateError.next("Please check your internet connection. We could delete this student at this time");

    });
  }

  updateStudent(student: Student){
    this.studentData.updateStudent(student).subscribe(response => {
      this.toastEvents.updateToast.next('Student Updated');

      this.getAllStudents();
    }, error => {
      console.log(error);
      this.errorEvents.updateError.next("This student could not be updated at this time. It could be an internet connection problem.");

    });
  }

  deactivateStudent(hbId: string) {
    this.studentData.deactivateStudent(hbId).subscribe(response => {
      this.getAllStudents();
    }, error => {
      console.log(error);
      this.errorEvents.updateError.next("We could not deactivate this student at this time. It could be an internet connection problem.");
    });
  }

  reactivateStudent(hbId: string) {
    this.studentData.reactivateStudent(hbId).subscribe(response => {
      this.getAllStudents();
    }, error => {
      console.log(error);
      this.errorEvents.updateError.next("We could not reactivate this student at this time. It could be an internet connection problem.");

    });
  }

  getStudentsActiveState(studentList){
    let active: any;

    active = _.partition(studentList, (student) =>{
      return student.isActive || student.isActive == null;
    });

    return active;
  }

}