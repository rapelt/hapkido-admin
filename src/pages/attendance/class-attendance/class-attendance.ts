import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Class} from "../../../models/class";
import {StudentService} from "../../../services/student/student.service";
import {StudentEvents} from "../../../services/student/student.events";
import {Student} from "../../../models/student";
import {AttendanceService} from "../../../services/attendance.service";
import {ClassService} from "../../../services/class/class.service";

@Component({
  selector: 'page-class-attendance',
  templateUrl: 'class-attendance.html',
})
export class ClassAttendancePage implements OnInit{

  aclass: Class;

  students: Array<Student>;

  attended: Array<Student>;

  notAttended: Array<Student>;

  attendance = "studentsAttended";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public studentService: StudentService,
              public studentEvents: StudentEvents,
              private attendanceService :AttendanceService,
              private classService: ClassService) {
  }

  ngOnInit(){
    this.studentService.getAllStudents();
    this.aclass = this.navParams.get('aclass');

    this.studentEvents.studentsUpdated.subscribe((students: Array<Student>)=>{
      this.students = students;

      let attendanceLists = this.attendanceService.getAttendedStudents(this.aclass.attendance, students);

      this.attended = attendanceLists[0];
      this.notAttended = this.studentService.getStudentsActiveState(attendanceLists[1])[0];
    });
  }

  removeStudent(student, index){
    this.attended.splice(index, 1);
    this.notAttended.push(student);
    this.attendanceService.removeStudentFromAClass(student.hbId, this.aclass.classId);
  }

  addStudent(student, index){
    this.notAttended.splice(index, 1);
    this.attended.push(student);
    this.attendanceService.addStudentToAClass(student.hbId, this.aclass.classId);
  }

  deleteClass(){
    this.classService.deleteClass(this.aclass.classId);
    this.navCtrl.pop();
  }

}
