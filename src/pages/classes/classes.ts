import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {AddClassesPage} from "./addClasses/addClasses";
import {Class} from "../../models/class";
import {ClassService} from "../../services/class/class.service";

@Component({
  selector: 'page-classes',
  templateUrl: 'classes.html',
})
export class ClassesPage{

  addClassesPage: any = AddClassesPage;

  allClasses: Array<Class> = [];

  futureClasses: Array<Class> = [];

  nextClass: Class;

  constructor(public navCtrl: NavController, public navParams: NavParams, private classService: ClassService) {
  }

  ionViewWillEnter(){
    this.futureClasses = this.classService.getFutureClasses();
    this.nextClass = this.classService.getNextClass();

  }

}
