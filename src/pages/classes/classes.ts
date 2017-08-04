import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  allClasses: any = [];

  futureClasses: Array<Class> = [];

  nextClass: Class;

  constructor(public navCtrl: NavController, public navParams: NavParams, private classService: ClassService, private classEvents: ClassEvents) {
  }

  ngOnInit(){
    this.classService.getAllClasses();

    this.classEvents.classesUpdated.subscribe( (classes:Array<Class>) => {
      this.allClasses = classes;
      this.futureClasses = this.classService.getFutureClasses(classes);
      this.nextClass = this.classService.getNextClass(classes);
    });
  }

  onDelete(classId){
    this.classService.deleteClass(classId);
  }

}
