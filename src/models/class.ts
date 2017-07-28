import {Moment} from "moment";

export class Class {
  constructor(
    public classid: string,
    public classType: string,
    public attendance: Array<string>,
    public isGrading: boolean,
    public date: Moment,
    public startTime: string
  ){}
}

