import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Student} from '../../models/student';
import {GradeService} from '../../services/grade.service';
import * as _ from 'underscore';
import {ClassService} from '../../services/class/class.service';


@Component({
  selector: 'student-list',
  templateUrl: 'student-list.html'
})
export class StudentListComponent {

  @Input()
  studentList: Array<Student>;

  @Input()
  shouldDisplayClassesMissed: boolean;

  @Output()
  studentSelected: EventEmitter<any> = new EventEmitter();

  text: string;

  constructor(private gradeService: GradeService, private classService: ClassService) {
    this.studentList = _.each(this.studentList, (student: any)=>{
      student.hasMissedToManyClasses =  this.classService.studentHasMissedToManyClasses(student);
    });
  }

  onClick(student, i){
    this.studentSelected.emit({student, i});
  }

}
