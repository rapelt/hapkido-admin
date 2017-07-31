import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {Student} from "../../models/student";

@Injectable()
export class StudentData {

    userUrl: string = 'https://tfub8jwq4h.execute-api.ap-southeast-2.amazonaws.com/dev/student/';

    constructor(public http: Http) {
    }

    getStudent(hbid: string): Observable<Student> {
        return this.http.get(this.userUrl + hbid).map((response: Response) => response.json());
    }

    getAllStudents(): Observable<Student []> {
        return this.http.get(this.userUrl + "all").map((response: Response) => response.json());
    }

    createStudent(student: Student): Observable<Student> {
        return this.http.post(this.userUrl + "create", student, this.getHeaders()).map((response: Response) => response.json());
    }

    updateStudent(student: Student): Observable<Student> {
        return this.http.post(this.userUrl + "update/" + student.hbId, student, this.getHeaders()).map((response: Response) => response.json());
    }

    deleteStudent(hbid: string): Observable<Student> {
        return this.http.post(this.userUrl + "delete/" + hbid, null, this.getHeaders()).map((response: Response) => response.json());
    }

    getHeaders() {
        return new Headers(
          {
              'Access-Control-Allow-Origin': 'http://localhost:8100'
          }
        );
    }
}
