import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {Class} from "../../models/class";

@Injectable()
export class ClassData {

  userUrl: string = 'https://tfub8jwq4h.execute-api.ap-southeast-2.amazonaws.com/dev/class/';

  constructor(public http: Http) {
  }

  getClass(classId: string): Observable<Class> {
    return this.http.get(this.userUrl + classId).map((response: Response) => response.json());
  }

  getAllClasses(): Observable<Class []> {
    return this.http.get(this.userUrl + "all").map((response: Response) => response.json());
  }

  createClasses(classes: Array<Class>): Observable<Array<Class>> {
    console.log("Create Class");
    return this.http.post(this.userUrl + "create", {classes: classes}, this.getHeaders()).map((response: Response) => response.json());
  }

  updateClass(aclass: Class): Observable<Class> {
    console.log("Update Class");
    return this.http.post(this.userUrl + "update/" + aclass.classid, aclass, this.getHeaders()).map((response: Response) => response.json());
  }

  deleteClass(classid: string): Observable<Class> {
    console.log("Delete Class");
    return this.http.post(this.userUrl + "delete/" + classid, null, this.getHeaders()).map((response: Response) => response.json());
  }

  getHeaders() {
    return new Headers(
      {
        'Access-Control-Allow-Origin': 'http://localhost:8100'
      }
    );
  }
}
