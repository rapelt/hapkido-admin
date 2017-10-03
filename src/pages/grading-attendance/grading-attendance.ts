import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, PopoverController} from 'ionic-angular';
import {StudentService} from '../../services/student/student.service';
import {StudentEvents} from '../../services/student/student.events';
import {AttendanceService} from '../../services/attendance.service';
import {ClassService} from '../../services/class/class.service';
import {GradeService} from '../../services/grade.service';
import {Student} from '../../models/student';
import {Class} from '../../models/class';
import * as moment from 'moment';
import * as _ from 'underscore';
import { ItemSliding } from 'ionic-angular';


@Component({
  selector: 'page-grading-attendance',
  templateUrl: 'grading-attendance.html',
})
export class GradingAttendancePage {

  aclass: Class;

  studentsInClass: Array<any>;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public studentService: StudentService,
              public studentEvents: StudentEvents,
              public alertCtrl: AlertController) {
  }

  ngOnInit(){

    this.studentEvents.studentsUpdated.subscribe((students: Array<Student>)=>{
      this.studentsInClass = _.each(this.studentService.getAnArrayOfStudentsById(this.aclass.attendance), (student) =>{
        student.gradingDates = _.sortBy(student.gradingDates, (grade)=>{
          return grade.grade;
        }).reverse();

        student.gradeBeforeGrading = this.gradeBeforeGrading(student);
        student.gradeAfterGrading = this.gradeAfterGrading(student);
        student.didGrade = this.gradedToday(student);
      });
    });

    this.aclass = this.navParams.get('aclass');

    this.studentsInClass = _.each(this.studentService.getAnArrayOfStudentsById(this.aclass.attendance), (student) =>{
      student.gradingDates = _.sortBy(student.gradingDates, (grade)=>{
        return grade.grade;
      }).reverse();

      student.gradeBeforeGrading = this.gradeBeforeGrading(student);
      student.gradeAfterGrading = this.gradeAfterGrading(student);
      student.didGrade = this.gradedToday(student);
    });

  }

  gradedToday(student){
    let didGrade =  _.find(student.gradingDates, (grading) =>{
      if(moment(grading.date).isSame(this.aclass.date)){
        return true;
      }
      return false;
    });

    if(didGrade){
      return true;
    }
    return false;
  }

  gradeBeforeGrading(student){
     let grade = _.find(student.gradingDates, (grading) =>{
      if(moment(grading.date).isBefore(this.aclass.date)){
        return true;
      }
      return false;
    });

     if(grade){
       return grade.grade;
     }

     return student.grade;
  }

  gradeAfterGrading(student){
    let grade = _.find(student.gradingDates, (grading) =>{
      if(moment(grading.date).isSameOrBefore(this.aclass.date)){
        return true;
      }
      return false;
    });

    if(grade){
      return grade.grade;
    }

    return student.grade;
  };



  none(student, slidingItem: ItemSliding){
    slidingItem.close();

    let todaysGrades = _.filter(student.gradingDates, (grade)=>{
      if(moment(grade.date).isSame(this.aclass.date)){
        return true;
      }
      return false;
    });

    let maxToday = _.max(todaysGrades, (todaysGrade) =>{
      return todaysGrade.grade;
    });

    let higherGrade = _.find(student.gradingDates, (gradingDate)=>{
      return gradingDate.grade > maxToday.grade;
    });

    if(higherGrade){
      this.presentConfirm(student, todaysGrades);
    } else {
      this.removeGrading(student, todaysGrades);
    }







  }

  removeGrading(student, todaysGrades){
    this.studentService.removeGrading(student.hbId, todaysGrades);
  }

  presentConfirm(student, todaysGrades) {
    const alert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'This student has future gradings',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.removeGrading(student, todaysGrades);
          }
        }
      ]
    });
    alert.present();
  }

  checkIfGradeAlreadyExists(student, number){
     return _.find(student.gradingDates, (grade)=>{
      if(this.gradeBeforeGrading(student) + number === grade.grade){
        return true;
      }
      return false;
    });
  }

  single(student, slidingItem: ItemSliding){
    slidingItem.close();

    var gradeAlreadyExists = this.checkIfGradeAlreadyExists(student, 1);

    if(gradeAlreadyExists){
      return;
    }

    console.log(student);

    const grading = {
      date: this.aclass.date,
      grade: this.gradeBeforeGrading(student) + 1
    };
    this.studentService.addGrading(student.hbId, [grading]);
  }

  double(student, slidingItem: ItemSliding){
    console.log(student);
    slidingItem.close();

    let gradesToAdd =[];

    var firstGradeAlreadyExists = this.checkIfGradeAlreadyExists(student, 1);

    if(!firstGradeAlreadyExists){
      const grading = {
        date: this.aclass.date,
        grade: this.gradeBeforeGrading(student) + 1
      };

      gradesToAdd.push(grading);
    }

    var secondGradeAlreadyExists = this.checkIfGradeAlreadyExists(student, 2);

    if(!secondGradeAlreadyExists){
      const grading2 = {
        date: this.aclass.date,
        grade: this.gradeBeforeGrading(student) + 2
      };

      gradesToAdd.push(grading2);
    }

    if(gradesToAdd.length > 0){
      this.studentService.addGrading(student.hbId, gradesToAdd);

    }

  }
}
