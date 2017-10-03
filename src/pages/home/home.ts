import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import { EnvVariables } from '../../app/enviroment/enviroment.token';
import {ClassService} from '../../services/class/class.service';
import {Moment} from 'moment';
import * as moment from 'moment';
import {StudentService} from '../../services/student/student.service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy{
  title: string = 'Home';
  environment: string = '';

  today: Moment = moment();

  constructor(public navCtrl: NavController, @Inject(EnvVariables) public envVariables, private classService: ClassService, private studentService: StudentService) {
  }

  ngOnInit(){
    this.classService.repeat();

    this.classService.getTodaysClasses();
    this.classService.getAllClasses();
    this.studentService.getAllStudents();

    this.environment = this.envVariables.environmentName;
  }

  changeTitle(title){
    this.title = title;
  }

  ngOnDestroy(): void {
    this.classService.clearInterval();
  }

}
