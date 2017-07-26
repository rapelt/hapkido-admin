import {Student} from "../../models/student";
import {Injectable} from "@angular/core";
import {Class} from "../../models/class";
import {Moment} from "moment";
import * as moment from 'moment';

@Injectable()
export class ClassService {
  private classes: Class[] = [];

  constructor() {}

  createClass(){
  }

  createClasses(newClasses: Array<Class>){
    this.classes.push(...newClasses);
  }

  getAllClasses(){
    return this.classes;
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