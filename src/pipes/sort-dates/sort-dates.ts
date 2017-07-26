import { Pipe, PipeTransform } from '@angular/core';
import {Class} from "../../models/class";
import * as moment from "moment";

@Pipe({
  name: 'sortdates',
})
export class SortDatesPipe implements PipeTransform {
  transform(array: Class[], args: any): Class[] {
    console.log("calling pipe");
    if (array === null) return array;
    array.sort((a, b) => {
      if (moment(a.date).isBefore(b.date)) {
        return -1;
      } else if (moment(a.date).isAfter(b.date)) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
