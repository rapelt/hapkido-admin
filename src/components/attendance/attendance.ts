import { Component } from '@angular/core';
import {ClassEvents} from '../../services/class/class.events';
import {Class} from '../../models/class';

/**
 * Generated class for the AttendanceComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'attendance',
  templateUrl: 'attendance.html'
})
export class AttendanceComponent {

  text: string;

  todaysClasses: Array<Class>;

  constructor(private classEvents: ClassEvents) {
    this.classEvents.todaysClassesUpdated.subscribe((todaysClasses: Array<Class>) => {
      this.todaysClasses = todaysClasses;
    });
  }

}
