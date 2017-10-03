import {Student} from "../../models/student";
import {Injectable} from "@angular/core";
import {StudentData} from "./student.data";
import {StudentEvents} from "./student.events";
import * as _ from "underscore";
import {ToastEvents} from '../toast.events';
import {ErrorEvents} from '../error.events';
import * as moment from 'moment';

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

  addGrading(hbId: string, grading: any){
    this.studentData.addGrading(hbId, grading).subscribe(response => {
      this.getAllStudents();
    }, error => {
      console.log(error);
      this.errorEvents.updateError.next(JSON.parse(error._body).error);
    });
  }

  removeGrading(hbId: string, grading: any){
    this.studentData.removeGrading(hbId, grading).subscribe(response => {
      this.getAllStudents();
    }, error => {
      console.log(error);
      this.errorEvents.updateError.next(JSON.parse(error._body).error);
    });
  }

  getStudentsActiveState(studentList){
    let active: any;

    active = _.partition(studentList, (student) =>{
      return student.isActive || student.isActive == null;
    });

    return active;
  }

  getStudentById(hbid): Student{
    let astudent = _.find(this.students, (student)=>{
      if(student.hbId === hbid){
        return true;
      }
    });

    return astudent;
  }

  getAnArrayOfStudentsById(idArray): Array<Student>{
    let students: Array<Student> = [];

    _.each(idArray, (id) =>{
      students.push(this.getStudentById(id));
    });

    return students;
  }

  getLastGrading(student) {
    if(student.gradingDates[student.gradingDates.length -1].grade === 0){
      return null;
    }
    return moment(student.gradingDates[student.gradingDates.length -1].date);
  }

  getJoiningDate(student) {
    return moment(student.gradingDates[0].date);
  }
}