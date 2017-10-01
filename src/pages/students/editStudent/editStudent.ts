import {Component, OnInit} from '@angular/core';
import {LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Student} from "../../../models/student";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Name} from "../../../models/name";
import {GradeService} from "../../../services/grade.service";
import {StudentService} from "../../../services/student/student.service";
import {ClassTypes} from "../../../models/classType";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'page-editStudent',
  templateUrl: 'editStudent.html',
})
export class EditStudentPage implements OnInit{
  name : Name;
  student: Student;
  mode: string = "New";

  studentForm: FormGroup;

  grades: any = [];
  classTypes = ClassTypes;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public studentService: StudentService,
              public gradeService: GradeService,
              public authService: AuthService,
              private loadingCtrl: LoadingController) {}

  ngOnInit(){
    this.grades = this.gradeService.getAllGrades();
    this.mode = this.navParams.get("mode");

    if(this.mode === 'New'){
      const name = new Name('', '');
      this.student = new Student(name, 'hb', '0000', 0, false, [], [], true, 'Adults');
    }

    if(this.mode === 'Edit'){
      this.student = this.navParams.get("student");
    }
    this.initaliseForm();
  }

  initaliseForm() {
    this.studentForm = new FormGroup({
      'firstname' : new FormControl(this.student.name.firstname, Validators.required),
      'lastname' : new FormControl(this.student.name.lastname, Validators.required),
      'hbid' : new FormControl({value: this.student.hbId, disabled: this.mode === 'Edit'}, [Validators.required, Validators.pattern(/hb+\d{3}$/)]),
      'pin' : new FormControl({value: this.student.pinNumber, disabled: this.mode === 'New'}),
      'grade' : new FormControl(this.student.grade, Validators.required),
      'preferredClass': new FormControl(this.student.preferredClass, Validators.required),
    });
  }

  onSubmit() {
    const studentFormValues = this.studentForm.value;
    this.student.name.firstname = studentFormValues.firstname;
    this.student.name.lastname = studentFormValues.lastname;
    this.student.grade = studentFormValues.grade;
    this.student.preferredClass = studentFormValues.preferredClass;
    if(this.mode === 'New'){
      this.student.hbId = studentFormValues.hbid;
      this.createStudent();
    }

    if(this.mode === 'Edit'){
      this.student.pinNumber = studentFormValues.pin ? studentFormValues.pin : '0000';
      this.updateStudent();
    }

    this.navCtrl.pop();
  }

  createStudent() {
    const loading = this.loadingCtrl.create({
      content: 'Signing ' + this.student.name.firstname + ' up...'
    });

    this.authService.signup(this.student.hbId, this.student.pinNumber)
      .then(data => {
        console.log(data)
        loading.dismiss();
      })
      .catch(error => {
        console.log(error)
        loading.dismiss();
      });
    this.studentService.createStudent(this.student);
  }

  updateStudent() {
    this.studentService.updateStudent(this.student);
  }
}
