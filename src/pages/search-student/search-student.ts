import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {Student} from "../../models/student";

@Component({
  selector: 'page-search-student',
  templateUrl: 'search-student.html',
})
export class SearchStudentPage implements OnInit{

  students = [];
  searchTerm = "";
  filteredStudents =[];

  @Output() studentToAdd: EventEmitter<Student> = new EventEmitter<Student>();


  constructor(public viewCtrl: ViewController, public navParams: NavParams) {}

  ngOnInit(){
    this.students = this.navParams.get('students');
    this.setFilteredItems();
  }

  close() {
    this.viewCtrl.dismiss();
  }

  addStudentToClass(event){
    this.viewCtrl.dismiss(event);
  }

  setFilteredItems() {
    this.filteredStudents = this.filterItemsFirstName(this.searchTerm);
  }

  filterItemsFirstName(searchTerm){
    return this.students.filter((student) => {
      return student.name.firstname.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || student.name.lastname.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

}
