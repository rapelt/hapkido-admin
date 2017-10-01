import {Component, EventEmitter, Output, Input} from '@angular/core';
import {SearchStudentPage} from '../../pages/search-student/search-student';
import {Student} from '../../models/student';
import {PopoverController} from 'ionic-angular';

/**
 * Generated class for the SearchStudentComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'search-student',
  templateUrl: 'search-student.html'
})
export class SearchStudentComponent {

  text: string;

  @Input()
  students: Array<Student>;

  @Output()
  selectedStudent: EventEmitter<Student> = new EventEmitter();

  constructor(private popoverCtrl: PopoverController,) {
  }

  presentPopover(event){
    let popover = this.popoverCtrl.create(SearchStudentPage, {students: this.students});
    popover.present({
      ev: event
    });

    popover.onDidDismiss((popoverData: Student) => {
      this.selectedStudent.emit(popoverData)
    })
  }

}
