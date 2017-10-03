import {Component, Input} from '@angular/core';
import {GradeService} from '../../services/grade.service';

/**
 * Generated class for the GradeBadgeComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'grade-badge',
  templateUrl: 'grade-badge.html'
})
export class GradeBadgeComponent {

  @Input()
  grade: any;

  @Input()
  longName: boolean;

  constructor(private gradeService: GradeService) {
  }

}
