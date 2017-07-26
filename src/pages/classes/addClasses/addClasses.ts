import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormArray, FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import * as moment from 'moment';
import {ClassTypes} from "../../../models/classType";
import {Class} from "../../../models/class";
import {Moment} from "moment";
import {ClassService} from "../../../services/class/class.service";

@Component({
  selector: 'page-add-classes',
  templateUrl: 'addClasses.html',
})
export class AddClassesPage implements OnInit{
  classForm: FormGroup;
  selectedDates: Array<Date> = [];
  preselectedDates: Array<Moment> = [];

  classTypes = ClassTypes;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _fb: FormBuilder, private classService: ClassService) {
  }

  onPeriodChange(event){
    this.selectedDates = event.selectedValues;
  }

  ngOnInit() {
    this.preselectedDates = this.classService.getAllDates();

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
      classType: ['', Validators.required],
      startTime: ['', Validators.required],
      isGrading: ['false']
    });
  }

  addClass() {
    // add address to the list
    const control = <FormArray>this.classForm.controls['classes'];
    control.push(this.initClass());
  }

  removeAddress(i: number) {
    const control = <FormArray>this.classForm.controls['classes'];
    control.removeAt(i);
  }

  onSubmit() {
    let newClasses: Array<Class> = [];

    this.selectedDates.forEach((ncdate)=>{
      (<FormArray>this.classForm.controls.classes).controls.forEach((newClass)=>{
        console.log(ncdate);

        let nc = <FormControl>newClass['controls'];
        let classType: string = nc['classType'].value;
        let attendance: Array<string> = [];
        let isGrading: boolean = nc['isGrading'].value;
        let time: any = nc['startTime'].value.split(':');
        let date: Moment = moment(ncdate);
        date.set({hour: time[0], minute: time[1]});
        let startTime: string = nc['startTime'].value;
        newClasses.push(new Class(classType, attendance, isGrading, date, startTime));
      });
    });
    console.log(newClasses);
    this.classService.createClasses(newClasses);
    this.navCtrl.pop();
  }

}


/*let classesTypes = [];

classesTypes.push(new FormGroup({
  'classType': new FormControl(null, Validators.required),
  'startTime': new FormControl(null, Validators.required),
  'isGrading': new FormControl(false)
}));

this.classForm = new FormGroup({
  'classes' : new FormArray(classesTypes)
});*/
