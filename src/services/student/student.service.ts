import {Student} from "../../models/student";
import {Injectable} from "@angular/core";
import {StudentData} from "./student.data";
import {StudentEvents} from "./student.events";

@Injectable()
export class StudentService {
  private students: Student[] = [];

  constructor(private studentData: StudentData, private studentEvents: StudentEvents) {}

  createStudent(student: Student){
    this.studentData.createStudent(student).subscribe(response => {
      this.getAllStudents();
    }, error => {
      console.log(error);
    });
  }

  getAllStudents(){
    this.studentData.getAllStudents().subscribe((studentsList: Student []) => {
      this.students = studentsList;
      this.studentEvents.studentsUpdated.next(this.students);
      console.log("Students Updated");
    }, (error) => {
      console.log(error);
    });
  }

  getStudent(hbid: string){
    //this.recipes[index] = recipe;
  }

  deleteSetudent(hbid: string){
    this.studentData.deleteStudent(hbid).subscribe(response => {
      this.getAllStudents();
    }, error => {
      console.log(error);
    });
  }

  updateStudent(student: Student){
    this.studentData.updateStudent(student).subscribe(response => {
      this.getAllStudents();
    }, error => {
      console.log(error);
    });
  }
}