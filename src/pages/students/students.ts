import {Component, OnDestroy, OnInit} from '@angular/core';
import {EditStudentPage} from './editStudent/editStudent';
import {ViewStudentPage} from './viewStudent/viewStudent';
import {GradeService} from '../../services/grade.service';
import {StudentService} from '../../services/student/student.service';
import {StudentEvents} from '../../services/student/student.events';
import {Student} from '../../models/student';
import {NavController} from 'ionic-angular';
import {ClassService} from '../../services/class/class.service';
import * as _ from 'underscore';



@Component({
  selector: 'page-students',
  templateUrl: 'students.html',
})
export class StudentsPage implements OnInit{
  students: any = [[], []];

  allStudents: Array<any>;

  editStudentPage: any = EditStudentPage;
  viewStudentPage: any = ViewStudentPage;

  activeStatus = 'active';

  constructor(private studentService: StudentService,
              private gradeService:GradeService,
              private studentEvent: StudentEvents,
              public navCtrl: NavController,
              public classService: ClassService) {
  }

  ngOnInit() {
    this.studentService.getAllStudents();

    this.studentEvent.studentsUpdated.subscribe((students: Array<Student>) => {
      this.allStudents = students;
      this.allStudents = _.each(this.allStudents, (student: any)=>{
        student.hasMissedToManyClasses =  this.classService.studentHasMissedToManyClasses(student);
      });
      this.students = this.studentService.getStudentsActiveState(students);
    });
  }

  studentSelected(event){
    this.navCtrl.push(this.viewStudentPage, {student: event['student']});
  }
}
