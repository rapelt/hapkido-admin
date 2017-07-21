import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Student} from "../../models/student";
import {StudentService} from "../../services/students.service";
import {EditStudentPage} from "./editStudent/editStudent";

@Component({
  selector: 'page-students',
  templateUrl: 'students.html',
})
export class StudentsPage implements OnInit{
  students: any;

  editStudentPage: any = EditStudentPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, private studentService: StudentService) {
  }

  ngOnInit(){
    this.studentService.getAllStudents().subscribe((studentsList: Student []) => {
          this.students = studentsList;
          }, (error) => {
          console.log(error);
        });
  }

}
