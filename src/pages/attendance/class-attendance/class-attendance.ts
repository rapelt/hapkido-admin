import {Component, OnInit} from '@angular/core';
import {AlertController, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Class} from '../../../models/class';
import {ClassTypes} from '../../../models/classType';

import {StudentService} from '../../../services/student/student.service';
import {StudentEvents} from '../../../services/student/student.events';
import {Student} from '../../../models/student';
import {AttendanceService} from '../../../services/attendance.service';
import {ClassService} from '../../../services/class/class.service';
import {SearchStudentPage} from '../../search-student/search-student';
import * as _ from 'underscore';
import {GradeService} from '../../../services/grade.service';
import * as moment from 'moment';
import {ErrorEvents} from '../../../services/error.events';

@Component({
  selector: 'page-class-attendance',
  templateUrl: 'class-attendance.html',
})
export class ClassAttendancePage implements OnInit{

  aclass: Class;

  students: Array<Student>;

  attended: Array<Student>;

  notAttended: Array<Student>;

  attendance = 'studentsAttended';

  classTypes = ClassTypes;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public studentService: StudentService,
              public studentEvents: StudentEvents,
              private attendanceService :AttendanceService,
              private classService: ClassService,
              private popoverCtrl: PopoverController,
              private gradeService: GradeService,
              private alertCtrl: AlertController) {
  }

  ngOnInit(){
    this.studentService.getAllStudents();
    this.aclass = this.navParams.get('aclass');

    this.studentEvents.studentsUpdated.subscribe((students: Array<Student>)=>{
      this.students = students;

      let attendanceLists = this.attendanceService.getAttendedStudents(this.aclass.attendance, students);

      this.attended = attendanceLists[0];
      this.notAttended = this.studentService.getStudentsActiveState(attendanceLists[1])[0];
      this.notAttended = this.notAttended.slice();
    });

    if(moment(this.aclass.date).isBefore(moment().subtract(3, 'days'))){
      this.presentConfirm();
    }
  }

  presentConfirm() {
    const alert = this.alertCtrl.create({
      title: 'Are you sure',
      message: 'This class was a while ago. Are you sure you want to update it?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.navCtrl.pop();
          }
        },
        {
          text: 'Yes',
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }

  removeStudent(student, index){
    this.attended.splice(index, 1);
    this.notAttended.push(student);
    this.attendanceService.removeStudentFromAClass(student.hbId, this.aclass.classId);
  }

  addStudent(student){
    this.shouldAddStudent(student);
  }

  deleteClass(){
    this.classService.deleteClass(this.aclass.classId);
    this.navCtrl.pop();
  }

  searchedStudent(event){
    this.shouldAddStudent(event)
  }

  shouldAddStudent(selectedStudent){
    if(selectedStudent == null){
      return;
    }
    let studentIndex = null;

    const notAttended = _.find(this.notAttended, (student, index) =>{
      if(student.hbId === selectedStudent.hbId){
        studentIndex = index;
        return student;
      }
    });

    if(notAttended){
      this.notAttended.splice(studentIndex, 1);
      this.notAttended = this.notAttended.slice();
    }

    const attendedAlready = _.find(this.attended, (student) =>{
      if(student.hbId === selectedStudent.hbId){
        return student;
      }
    });

    if(!attendedAlready){
      this.attended.push(selectedStudent);
    }

    this.attendanceService.addStudentToAClass(selectedStudent.hbId, this.aclass.classId);
  }

}
