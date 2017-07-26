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
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Student Details Menu',
      buttons: [
        {
          text: 'Delete',
          role: "destructive",
          handler: () => {
            this.presentConfirm();
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

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: `Do you want to delete ${this.student.name.firstname} ${this.student.name.lastname}`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          role: 'delete',
          handler: () => {
            this.studentService.deleteStudent(this.student.hbId);
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
}
