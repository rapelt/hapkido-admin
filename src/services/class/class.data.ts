import {Inject, Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {Class} from "../../models/class";
import {EnvVariables} from "../../app/enviroment/enviroment.token";

@Injectable()
export class ClassData {

  userUrl: string = 'http://localhost:8080/class/';

  constructor(public http: Http, @Inject(EnvVariables) public envVariables) {
    this.userUrl = this.envVariables.classAPIEndpoint;
  }

  getClass(classId: string): Observable<Class> {
    return this.http.get(this.userUrl + classId).map((response: Response) => response.json()).share();
  }

  getTodaysClasses(): Observable<Class []> {
    return this.http.get(this.userUrl + "todaysclasses").map((response: Response) => response.json()).share();
  }

  getAllClasses(): Observable<Class []> {
    return this.http.get(this.userUrl + "all").map((response: Response) => response.json()).share();
  }

  createClasses(classes: Array<Class>): Observable<Array<Class>> {
    return this.http.post(this.userUrl + "create", {classes: classes}, this.getHeaders()).map((response: Response) => response.json()).share();
  }

  updateClass(aclass: Class): Observable<Class> {
    return this.http.post(this.userUrl + "update/" + aclass.classId, aclass, this.getHeaders()).map((response: Response) => response.json()).share();
  }

  deleteClass(classid: string): Observable<Class> {
    return this.http.post(this.userUrl + "delete/" + classid, null, this.getHeaders()).map((response: Response) => response.json()).share();
  }

  addStudentToClass(studentId: string, classId: string){
    return this.http.post(this.userUrl + "addtoclass/" + classId, {studentId: studentId}, this.getHeaders()).map((response: Response) => response.json()).share();
  }

  removeStudentFromClass(studentId: string, classId: string){
    return this.http.post(this.userUrl + "removefromclass/" + classId, {studentId: studentId}, this.getHeaders()).map((response: Response) => response.json()).share();
  }

  getHeaders() {
    return new Headers(
      {
        'Access-Control-Allow-Origin': 'http://localhost:8100'
      }
    );
  }
}
