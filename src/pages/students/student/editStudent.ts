import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Student} from "../../../models/student";

@Component({
  selector: 'page-student',
  templateUrl: 'editStudent.html',
})
export class StudentPage implements OnInit{
  student: Student;
  mode: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit(){
      this.mode = this.navParams.get("mode");
      this.student = this.navParams.get("student");

      if(this.mode == null){
          this.mode = "New";
      }
  }

}
