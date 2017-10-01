import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import { EnvVariables } from '../../app/enviroment/enviroment.token';
import {ClassService} from '../../services/class/class.service';
import {Moment} from "moment";
import * as moment from 'moment';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy{
  title: string = 'Home';
  environment: string = '';

  today: Moment = moment();

  constructor(public navCtrl: NavController, @Inject(EnvVariables) public envVariables, private classService: ClassService) {
  }

  ngOnInit(){
    this.classService.repeat();

    this.classService.getTodaysClasses();
    this.classService.getAllClasses();

    this.environment = this.envVariables.environmentName;
  }

  changeTitle(title){
    this.title = title;
  }

  ngOnDestroy(): void {
    this.classService.clearInterval();
  }

}
