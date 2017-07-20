import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

@Injectable()
export class StudentService {

    userUrl: string = 'https://tfub8jwq4h.execute-api.ap-southeast-2.amazonaws.com/dev/student/';

    constructor(public http: Http) {
        console.log('Hello StudentService Provider');
    }

    getStudent(): Observable<Response> {
        return this.http.get(this.userUrl + "hb030").map((response: Response) => response.json());
    }

    getAllStudents() {
        console.log("get al; studnets", this.userUrl + "all");
        return this.http.get(this.userUrl + "all").map((response: Response) => response.json().students);
    }



}