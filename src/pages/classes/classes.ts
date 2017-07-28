import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {AddClassesPage} from "./addClasses/addClasses";
import {Class} from "../../models/class";
import {ClassService} from "../../services/class/class.service";
import {ClassEvents} from "../../services/class/class.events";

@Component({
  selector: 'page-classes',
  templateUrl: 'classes.html',
})
export class ClassesPage implements OnInit{

  addClassesPage: any = AddClassesPage;

  allClasses: Array<Class> = [];

  futureClasses: Array<Class> = [];

  nextClass: Class;

  constructor(public navCtrl: NavController, public navParams: NavParams, private classService: ClassService, private classEvents: ClassEvents) {
  }

  ngOnInit(){
    this.classService.getAllClasses();

    this.classEvents.classesUpdated.subscribe( classes => {
      this.futureClasses = this.classService.getFutureClasses();
      this.nextClass = this.classService.getNextClass();
    });
  }

}
