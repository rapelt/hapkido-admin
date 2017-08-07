import {Component, Inject, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import { EnvVariables } from '../../app/enviroment/enviroment.token';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  title: string = "Home";
  environment: string = '';

  constructor(public navCtrl: NavController, @Inject(EnvVariables) public envVariables) {
  }

  ngOnInit(){
    this.environment = this.envVariables.environmentName;
  }

  changeTitle(title){
    this.title = title;
  }

}
