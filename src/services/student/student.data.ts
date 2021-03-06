import {Inject, Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {Student} from "../../models/student";
import {EnvVariables} from "../../app/enviroment/enviroment.token";

@Injectable()
export class StudentData {

    userUrl: string = 'http://localhost:8080/student/';

    constructor(public http: Http, @Inject(EnvVariables) public envVariables) {
        this.userUrl = this.envVariables.studentAPIEndpoint;
    }

    getStudent(hbid: string): Observable<Student> {
        return this.http.get(this.userUrl + hbid).map((response: Response) => response.json()).share();
    }

    getAllStudents(): Observable<Student []> {
        return this.http.get(this.userUrl + "all").map((response: Response) => response.json()).share();
    }

    createStudent(student: Student): Observable<Student> {
        return this.http.post(this.userUrl + "create", student, this.getHeaders()).map((response: Response) => response.json()).share();
    }

    updateStudent(student: Student): Observable<Student> {
        return this.http.post(this.userUrl + "update/" + student.hbId, student, this.getHeaders()).map((response: Response) => response.json()).share();
    }

    deleteStudent(hbid: string): Observable<Student> {
        return this.http.post(this.userUrl + "delete/" + hbid, null, this.getHeaders()).map((response: Response) => response.json()).share();
    }

    deactivateStudent(hbId: string): Observable<Student> {
        return this.http.post(this.userUrl + "deactivate/" + hbId, null, this.getHeaders()).map((response: Response) => response.json()).share();
    }

    reactivateStudent(hbId: string): Observable<Student> {
        return this.http.post(this.userUrl + "reactivate/" + hbId, null, this.getHeaders()).map((response: Response) => response.json()).share();
    }

    addGrading(hbId: string, grading): Observable<Student> {
        return this.http.post(this.userUrl + "addGrading/" + hbId, grading, this.getHeaders()).map((response: Response) => response.json()).share();
    }

    removeGrading(hbId: string, grading): Observable<Student> {
        return this.http.post(this.userUrl + "removeGrading/" + hbId, grading, this.getHeaders()).map((response: Response) => response.json()).share();
    }

    getHeaders() {
        return new Headers(
          {
              'Access-Control-Allow-Origin': 'http://localhost:8100'
          }
        );
    }
}
