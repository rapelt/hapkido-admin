import {Component, OnInit} from '@angular/core';
import {ActionSheetController, AlertController, NavController, NavParams} from 'ionic-angular';
import {Student} from "../../../models/student";
import {EditStudentPage} from "../editStudent/editStudent";
import {GradeService} from "../../../services/grade.service";
import {StudentService} from "../../../services/student/student.service";

@Component({
  selector: 'page-viewStudent',
  templateUrl: 'viewStudent.html',
})
export class ViewStudentPage implements OnInit{
  student: Student;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController,
              public gradeService: GradeService,
              public studentService: StudentService) {
  }

  ngOnInit(){
      this.student = this.navParams.get("student");
  }

  presentActionSheet() {
    if(this.student.isActive !== false){
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Student Details Menu',
        buttons: [
          {
            text: 'Deactivate',
            role: "destructive",
            handler: () => {
              this.presentConfirmDeactivate();
            }
          },{
            text: 'Edit',
            handler: () => {
              this.navCtrl.push(EditStudentPage, {mode: 'Edit', student: this.student});
            }
          },{
            text: 'Cancel',
            role: 'cancel',
            handler: () => {}
          }
        ]
      });
      actionSheet.present();
    } else {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Student Details Menu',
        buttons: [
          {
            text: 'Reactivate',
            role: "destructive",
            handler: () => {
              this.presentConfirmReactivate();
            }
          },{
            text: 'Edit',
            handler: () => {
              this.navCtrl.push(EditStudentPage, {mode: 'Edit', student: this.student});
            }
          },{
            text: 'Cancel',
            role: 'cancel',
            handler: () => {}
          }
        ]
      });
      actionSheet.present();
    }

  }

  presentConfirmDeactivate() {
    let alert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: `Do you want to deactivate ${this.student.name.firstname} ${this.student.name.lastname}`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Deactivate',
          role: 'delete',
          handler: () => {
            this.studentService.deactivateStudent(this.student.hbId);
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

  presentConfirmReactivate() {
    let alert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: `Do you want to Reactivate ${this.student.name.firstname} ${this.student.name.lastname}`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Reactivate',
          role: 'delete',
          handler: () => {
            this.studentService.reactivateStudent(this.student.hbId);
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
}
