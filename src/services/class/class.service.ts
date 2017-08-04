import {Student} from "../../models/student";
import {Injectable} from "@angular/core";
import {Class} from "../../models/class";
import {Moment} from "moment";
import * as moment from 'moment';
import {ClassData} from "./class.data";
import {ClassEvents} from "./class.events";

@Injectable()
export class ClassService {
  private classes: Class[] = [];

  constructor(private classData: ClassData, private classEvents: ClassEvents) {}

  createClass(){
  }

  setClasses(classes) {
    this.classes = classes;
  }

  createClasses(newClasses: Array<Class>){
    this.classData.createClasses(newClasses).subscribe(response => {
      this.getAllClasses();
    }, error => {
      console.log(error);
    });
  }

  getAllClasses(){
    this.classData.getAllClasses().subscribe((classList: Class []) => {
      classList.forEach((aclass)=>{
        aclass.date = moment(aclass.date);
      });
      this.setClasses(classList);
      this.classEvents.classesUpdated.next(this.classes);
    }, (error) => {
      console.log(error);
    });
  }

  getClass(){
  }

  deleteClass(classId: string){
    this.classData.deleteClass(classId).subscribe(response => {
      this.getAllClasses();
    }, error => {
      console.log(error);
    });
  }

  updateClass() {
  }

  sortClasses(classes: Array<Class>) {
    return classes.sort((a, b) => {
      if (moment(a.date).isBefore(b.date)) {
        return -1;
      } else if (moment(a.date).isAfter(b.date)) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  getNextClass(classes: Array<Class>){
    let futureClasses = this.getFutureClasses(classes);
    return this.sortClasses(futureClasses)[0];
  }

  getFutureClasses(classes: Array<Class>){
    let futureClasses: Array<Class> = [];

    classes.forEach((aclass) => {
      if(moment(aclass.date).isAfter(moment.now())){
        futureClasses.push(aclass);
      }
    });
    return futureClasses;
  }

  getAllDates(classes): Array<Moment>{
    let dates: Array<Moment> = [];
    classes.forEach((aclass)=>{
        dates.push(aclass.date);
    });
    return dates;
  }

  getClassesOnDay(selectedValue: Date, classes: Array<Class>) {
    let day = moment(selectedValue);
    let classesOnADay: Array<Class> = [];

    classes.forEach((aclass) => {
      if(moment(day).isSame(aclass.date, 'day')){
        classesOnADay.push(aclass);
      }
    });
    return classesOnADay;
  }

  addStudent(studentId: string, classId: string){
    this.classData.addStudentToClass(studentId, classId).subscribe(response => {
      this.getAllClasses();
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  removeStudent(studentId: string, classId: string) {
    this.classData.removeStudentFromClass(studentId, classId).subscribe(response => {
      this.getAllClasses();
      console.log(response);
    }, error => {
      console.log(error);
    });
  }
}