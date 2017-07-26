import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup} from "@angular/forms";
import * as moment from 'moment';

/**
 * Generated class for the ClassesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-classes',
  templateUrl: 'classes.html',
})
export class ClassesPage {
  formGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassesPage');
  }

  onPeriodChange(event){
    console.log(event);
  }

}
