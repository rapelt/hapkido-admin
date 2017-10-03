import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Class} from '../../models/class';
import {ClassService} from '../../services/class/class.service';
import {ClassEvents} from '../../services/class/class.events';
import {Moment} from 'moment';
import * as _ from 'underscore';
import {GradingAttendancePage} from '../grading-attendance/grading-attendance';

/**
 * Generated class for the GradesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-grades',
  templateUrl: 'grades.html',
})
export class GradesPage {

  gradingAttendancePage: any = GradingAttendancePage;

  allGradings: any = [];
  preselectedDates: Array<Moment> = [];

  maxDate: Date = new Date();

  gradingsOnDay: any = [];

  selectedValue: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public classService: ClassService, public classEvents: ClassEvents) {
  }

  ngOnInit() {
    this.classService.getAllClasses();

    this.classEvents.classesUpdated.subscribe( (classes:Array<Class>) => {
      this.allGradings = _.filter(classes, (aclass)=>{
        return aclass.isGrading;
      });
      this.preselectedDates = this.classService.getAllDates(this.allGradings);
      this.resetClassesOnDay();
    });
  }

  onPeriodChange(event){
    this.selectedValue = event.selectedValue;
    this.resetClassesOnDay();
  }

  resetClassesOnDay(){
    if(this.selectedValue != null){
      this.gradingsOnDay = this.classService.getClassesOnDay(this.selectedValue, this.allGradings);
    }
  }

}
