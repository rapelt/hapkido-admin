import { Pipe, PipeTransform } from '@angular/core';
import {Student} from "../../models/student";

@Pipe({
  name: 'filterbypreferredclasstype',
})
export class FilterByPreferredClassTypePipe implements PipeTransform {
  transform(array: Student[], args: any): Student[] {
    if (array === null) return array;
    let filteredByClass = array.filter(student =>{
      if(student.preferredClass === args){
        return true;
      }
      return false;
    });

    return filteredByClass;
  }
}
