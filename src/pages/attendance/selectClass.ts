import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ClassService} from "../../services/class/class.service";
import {ClassEvents} from "../../services/class/class.events";
import {Class} from "../../models/class";
import {Moment} from "moment";
import {ClassAttendancePage} from "./class-attendance/class-attendance";

@Component({
  selector: 'page-select-class',
  templateUrl: 'selectClass.html',
})
export class SelectClassPage implements OnInit{
  classAttendancePage: any = ClassAttendancePage;

  allClasses: any = [];
  preselectedDates: Array<Moment> = [];

  maxDate: Date = new Date();

  classesOnDay: any = [];

  selectedValue: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public classService: ClassService, public classEvents: ClassEvents) {
  }

  ngOnInit() {
    this.classService.getAllClasses();

    this.classEvents.classesUpdated.subscribe( (classes:Array<Class>) => {
      this.allClasses = classes;
      this.preselectedDates = this.classService.getAllDates(this.allClasses);
      this.resetClassesOnDay();
    });
  }

  onPeriodChange(event){
    this.selectedValue = event.selectedValue;
    this.resetClassesOnDay();
  }

  resetClassesOnDay(){
    if(this.selectedValue != null){
      this.classesOnDay = this.classService.getClassesOnDay(this.selectedValue, this.allClasses);
    }
  }
}
