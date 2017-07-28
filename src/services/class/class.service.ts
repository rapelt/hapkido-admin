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

  createClasses(newClasses: Array<Class>){
    this.classData.createClasses(newClasses).subscribe(response => {
      console.log(response);
      this.getAllClasses();
    }, error => {
      console.log(error);
    });;
    //this.classes.push(...newClasses);
  }

  getAllClasses(){
    this.classData.getAllClasses().subscribe((classList: Class []) => {
      classList.forEach((aclass)=>{
        aclass.date = moment(aclass.date);
      });
      this.classes = classList;
      this.classEvents.classesUpdated.next(this.classes);
      console.log("Classes Updated", this.classes);
    }, (error) => {
      console.log(error);
    });
  }

  getClass(){
  }

  deleteClass(){
  }

  updateClass() {
  }

  getNextClass(){
    let futureClasses = this.getFutureClasses();
    futureClasses.sort((a, b) => {
        if (moment(a.date).isBefore(b.date)) {
          return -1;
        } else if (moment(a.date).isAfter(b.date)) {
          return 1;
        } else {
          return 0;
        }
      });

    return futureClasses[0];
  }

  getFutureClasses(){
    let futureClasses: Array<Class> = [];

    this.classes.forEach((aclass) => {
      if(moment(aclass.date).isAfter(moment.now())){
        futureClasses.push(aclass);
      }
    });
    return futureClasses;
  }

  getAllDates(): Array<Moment>{
    let dates: Array<Moment> = [];
    this.classes.forEach((aclass)=>{
        dates.push(aclass.date);
    });
    return dates;
  }


}