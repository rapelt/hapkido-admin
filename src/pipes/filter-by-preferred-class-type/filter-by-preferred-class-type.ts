import { Pipe, PipeTransform } from '@angular/core';
import {Student} from "../../models/student";
import {GradeService} from "../../services/grade.service";

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

      if(args === 'Black Belt'){
        return student.grade > 7;
      }

      if(args === 'Kumdo'){
        return false;
        // TODO
      }
      return false;
    });

    return filteredByClass;
  }
}
