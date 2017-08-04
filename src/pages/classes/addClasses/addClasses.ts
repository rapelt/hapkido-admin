import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormArray, FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import * as moment from 'moment';
import {ClassTypes} from "../../../models/classType";
import {Class} from "../../../models/class";
import {Moment} from "moment";
import {ClassService} from "../../../services/class/class.service";
import {ClassEvents} from "../../../services/class/class.events";

@Component({
  selector: 'page-add-classes',
  templateUrl: 'addClasses.html',
})
export class AddClassesPage implements OnInit{
  classForm: FormGroup;
  selectedDates: Array<Date> = [];
  preselectedDates: Array<Moment> = [];
  classes: Array<Class> = [];

  classTypes = ClassTypes;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _fb: FormBuilder, private classService: ClassService, private classEvents: ClassEvents) {
  }

  onPeriodChange(event){
    this.selectedDates = event.selectedValues;
  }

  ngOnInit() {
    this.classes = this.navParams.get('allClasses');
    this.preselectedDates = this.classService.getAllDates(this.classes);
    this.initaliseForm();
  }

  initaliseForm() {
    this.classForm = this._fb.group({
      classes: this._fb.array([
        this.initClass(),
      ])
    });
  }

  initClass() {
    return this._fb.group({
      classType: ['Adults', Validators.required],
      startTime: ['', Validators.required],
      isGrading: ['false']
    });
  }

  addClass() {
    const control = <FormArray>this.classForm.controls['classes'];
    control.push(this.initClass());
  }

  removeClass(i: number) {
    const control = <FormArray>this.classForm.controls['classes'];
    control.removeAt(i);
  }

  onSubmit() {
    let newClasses: Array<Class> = [];

    this.selectedDates.forEach((ncdate)=>{
      (<FormArray>this.classForm.controls.classes).controls.forEach((newClass)=>{
        let nc = <FormControl>newClass['controls'];
        let classType: string = nc['classType'].value;
        let attendance: Array<string> = [];
        let isGrading: boolean = nc['isGrading'].value;
        let time: any = nc['startTime'].value.split(':');
        let date: Moment = moment(ncdate);
        date.set({hour: time[0], minute: time[1]});
        let startTime: string = nc['startTime'].value;
        newClasses.push(new Class('0', classType, attendance, isGrading, date, startTime));
      });
    });

    if(newClasses.length > 0){
      this.classService.createClasses(newClasses);
    }
    this.navCtrl.pop();
  }

}