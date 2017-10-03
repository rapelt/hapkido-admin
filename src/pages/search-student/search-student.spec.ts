import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import {IonicModule, NavController, NavParams, ViewController} from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import {SearchStudentPage} from './search-student';
import {AlphabeticalStudentsPipe} from '../../pipes/alphabetical-students/alphabetical-students';
import {NavParamsMock} from '../../testHelperMethods/NavParamsMock';
import {Student} from '../../models/student';
import {Name} from '../../models/name';
import {ViewControllerMock} from 'ionic-mocks';
import {StudentListComponent} from '../../components/student-list/student-list';
import {GradeBadgeComponent} from '../../components/grade-badge/grade-badge';
import {GradeService} from '../../services/grade.service';
import {ClassService} from '../../services/class/class.service';
import {StudentData} from '../../services/student/student.data';
import {StudentDataMock} from '../../services/student/student.data.mock';
import {ClassData} from '../../services/class/class.data';
import {ClassDataMock} from '../../services/class/class.data.mock';
import {ClassEvents} from '../../services/class/class.events';
import {EnvironmentsModule} from '../../app/enviroment/enviroment.module';
import {ToastEvents} from '../../services/toast.events';
import {ErrorEvents} from '../../services/error.events';

let searchStudentPage: SearchStudentPage;
let fixture: ComponentFixture<SearchStudentPage>;
let de: DebugElement;
let el: HTMLElement;

describe('Page: Search Student Page', () => {
  const name : Name = new Name('Rebekah', 'Apelt');
  const rebekah = new Student(name, 'hb030', '0000', 2, true, [], [], true, false, 'Adults');

  const name2 : Name = new Name('Mark', 'Higgins');
  const mark = new Student(name2, 'hb031', '0000', 2, true, [], [], true, false, 'Adults');

  const name3 : Name = new Name('Daniel', 'Blarg');
  const daniel = new Student(name3, 'hb032', '0000', 2, true, [], [], true, false, 'Adults');

  const name4 : Name = new Name('John', 'Geddes');
  const john = new Student(name4, 'hb033', '0000', 2, true, [], [], true, false, 'Adults');

  const students: Student[] = [rebekah, mark, daniel, john];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp, SearchStudentPage, AlphabeticalStudentsPipe, StudentListComponent, GradeBadgeComponent],
      providers: [
        NavController,
        {provide: NavParams, useClass: NavParamsMock},
        {provide: ViewController, useClass: ViewControllerMock},
        {provide: StudentData, useClass: StudentDataMock},
        {provide: ClassData, useClass: ClassDataMock},
        GradeService,
        ClassService,
        ClassEvents,
        ErrorEvents,
        ToastEvents
      ],
      imports: [
        IonicModule.forRoot(MyApp),
        EnvironmentsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchStudentPage);
    searchStudentPage    = fixture.componentInstance;
    NavParamsMock.setParams('students', students);
  });

  afterEach(() => {
    fixture.destroy();
    searchStudentPage = null;
    de = null;
    el = null;
  });

  it('is created', () => {
    expect(fixture).toBeTruthy();
    expect(searchStudentPage).toBeTruthy();
  });

  it('is initialised with a Students when a Students is set', () => {
    searchStudentPage.ngOnInit();
    fixture.detectChanges();
    expect(searchStudentPage.students).toEqual([rebekah, mark, daniel, john]);
  });

  it('is should order students by firstname and lastname', () => {
    searchStudentPage.ngOnInit();
    let results = searchStudentPage.filterItemsFirstName('a');
    fixture.detectChanges();

    expect(results).toEqual([rebekah, mark, daniel]);
  });

});