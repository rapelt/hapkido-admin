import {Component, OnDestroy, OnInit} from '@angular/core';
import {EditStudentPage} from "./editStudent/editStudent";
import {ViewStudentPage} from "./viewStudent/viewStudent";
import {GradeService} from "../../services/grade.service";
import {StudentService} from "../../services/student/student.service";
import {StudentEvents} from "../../services/student/student.events";

@Component({
  selector: 'page-students',
  templateUrl: 'students.html',
})
export class StudentsPage implements OnInit, OnDestroy{
  students: any;

  editStudentPage: any = EditStudentPage;
  viewStudentPage: any = ViewStudentPage;

  constructor(private studentService: StudentService,
              private gradeService:GradeService,
              private studentEvent: StudentEvents) {
  }

  ngOnInit() {
    this.studentService.getAllStudents();

    this.studentEvent.studentsUpdated.subscribe(students => {
      this.students = students;
    });
  }

  ionViewWillEnter(){
    console.log("enter");
  }

  ngOnDestroy() {
    this.studentEvent.studentsUpdated.unsubscribe();
  }

}
