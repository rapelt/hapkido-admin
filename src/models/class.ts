import {Moment} from "moment";

export class Class {
  constructor(
    public classType: string,
    public attendence: Array<string>,
    public isGrading: boolean,
    public date: Moment,
    public startTime: string
  ){}
}

