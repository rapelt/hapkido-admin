import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  title: string = "Home";

  constructor(public navCtrl: NavController) {

  }

  changeTitle(title){
    this.title = title;
  }

}
