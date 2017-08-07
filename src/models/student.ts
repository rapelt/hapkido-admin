import {Name} from "./name";
import {GradingDates} from "./gradingDates";
import {Feedback} from "./feedback";

export class Student {
    constructor(
        public name: Name,
        public hbId: string,
        public pinNumber: string,
        public grade: number,
        public isAdmin: boolean,
        public gradingDates: GradingDates [],
        public feedback: Feedback [],
        public isActive: boolean

    ){}
}