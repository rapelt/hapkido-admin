import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {Student} from "../models/student";

@Injectable()
export class StudentService {

    userUrl: string = 'https://tfub8jwq4h.execute-api.ap-southeast-2.amazonaws.com/dev/student/';

    constructor(public http: Http) {
    }

    getStudent(): Observable<Student> {
        return this.http.get(this.userUrl + "hb030").map((response: Response) => response.json());
    }

    getAllStudents(): Observable<Student []> {
        return this.http.get(this.userUrl + "all").map((response: Response) => response.json());
    }
}