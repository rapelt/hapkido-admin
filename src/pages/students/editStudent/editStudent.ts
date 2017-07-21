import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {Student} from "../../../models/student";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Name} from "../../../models/name";

@Component({
  selector: 'page-student',
  templateUrl: 'editStudent.html',
})
export class EditStudentPage implements OnInit{
  name : Name;
  student: Student;
  mode: string = "New";

  studentForm: FormGroup;

  grades: any = [
    {id: 0, name: 'White'},
    {id: 1, name: 'Yellow 1'},
    {id: 2, name: 'Yellow 2'}
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
  }

  ngOnInit(){
    this.mode = this.navParams.get("mode");

    if(this.mode === 'New'){
      const name = new Name('', '');
      this.student = new Student(name, 'hb', '0000', 0, false, [], [], []);
    }

    if(this.mode === 'Edit'){
      this.student = this.navParams.get("student");
    }
    this.initaliseForm();
  }

  initaliseForm() {
    console.log(this.student);
    this.studentForm = new FormGroup({
      'firstname' : new FormControl(this.student.name.firstname, Validators.required),
      'lastname' : new FormControl(this.student.name.lastname, Validators.required),
      'hbid' : new FormControl({value: this.student.hbId, disabled: this.mode === 'Edit'}, Validators.required),
      'pin' : new FormControl({value: this.student.pinNumber, disabled: this.mode === 'New'}),
      'grade' : new FormControl(this.student.grade, Validators.required)
    });
  }

  onSubmit() {
    const studentFormValues = this.studentForm.value;
    this.student.name.firstname = studentFormValues.firstname;
    this.student.name.lastname = studentFormValues.lastname;
    this.student.grade = studentFormValues.grade;
    this.student.pinNumber = studentFormValues.pin ? studentFormValues.pin : '0000';
    this.student.hbId = studentFormValues.hbid;

    this.navCtrl.pop();
  }
}
