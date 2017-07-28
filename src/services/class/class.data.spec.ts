import { TestBed, inject } from '@angular/core/testing';
import {
  HttpModule,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import {ClassData} from "./class.data";
import {Class} from "../../models/class";
import * as moment from "moment";

describe('Class Data', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ClassData,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  describe('getAllClasses', () => {
    const aclass = new Class("", "", [], false, moment(), "");

    it('should return an Observable<Array<Class>>',
      inject([ClassData, XHRBackend], (classData, mockBackend) => {

        const mockResponse = [aclass];

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        classData.getAllClasses().subscribe((classes) => {
          expect(classes.length).toBe(1);
        });

      }));
  });
});