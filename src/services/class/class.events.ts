import {Subject} from "rxjs";

export class ClassEvents {
  classesUpdated = new Subject();
  todaysClassesUpdated = new Subject();
}