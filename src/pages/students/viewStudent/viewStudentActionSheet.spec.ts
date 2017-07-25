import {
  Events, NavController, NavParams, ActionSheetController,
  ActionSheet
} from 'ionic-angular';
import {EventsMock, ActionSheetControllerMock, NavControllerMock, ActionSheetMock} from 'ionic-mocks';
import {ViewStudentPage} from "./viewStudent";
import {GradeService} from "../../../services/grade.service";
import {StudentService} from "../../../services/student/student.service";

xdescribe('ViewStudent Action Sheet Tests', () => {

  let events: Events;
  let actionSheetController: ActionSheetController;
  let navController: NavController;
  let navParams: NavParams;
  let gradeService: GradeService;
  let studentService: StudentService;
  let actionSheetMock: ActionSheet;

  let viewStudentPage: ViewStudentPage;

  beforeEach(() => {

    events = EventsMock.instance();
    navController = NavControllerMock.instance();
    actionSheetMock = ActionSheetMock.instance();
    actionSheetController = ActionSheetControllerMock.instance(actionSheetMock);

    viewStudentPage = new ViewStudentPage(navController, navParams, actionSheetController, gradeService, studentService);
  });

  it('should call alert create', () => {
    viewStudentPage.presentActionSheet();
    expect(actionSheetController.create).toHaveBeenCalled();
  });

  it('should call present on actionSheet', () => {
    viewStudentPage.presentActionSheet();
    expect(actionSheetMock.present).toHaveBeenCalled();
  });
});