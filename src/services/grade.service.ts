export class GradeService {
  private grades = [
    {
      id: 0,
      shortName: "W",
      longName: "White"
    },
    {
      id: 1,
      shortName: "Y1",
      longName: "Yellow 1"
    },
    {
      id: 2,
      shortName: "Y2",
      longName: "Yellow 2"
    },
    {
      id: 3,
      shortName: "Y3",
      longName: "Yellow 3"
    },
    {
      id: 4,
      shortName: "B1",
      longName: "Blue 1"
    },
    {
      id: 5,
      shortName: "B2",
      longName: "Blue 2"
    },
    {
      id: 6,
      shortName: "B3",
      longName: "Blue 3"
    },
    {
      id: 7,
      shortName: "R1",
      longName: "Red 1"
    },
    {
      id: 8,
      shortName: "R2",
      longName: "Red 2"
    },
    {
      id: 9,
      shortName: "R3",
      longName: "Red 3"
    },
    {
      id: 10,
      shortName: "1D",
      longName: "1st Dan"
    },
    {
      id: 11,
      shortName: "2D",
      longName: "2nd Dan"
    },
    {
      id: 12,
      shortName: "3D",
      longName: "3rd Dan"
    },
    {
      id: 13,
      shortName: "4D",
      longName: "4th Dan"
    },
    {
      id: 14,
      shortName: "5D",
      longName: "5th Dan"
    },
    {
      id: 15,
      shortName: "6D",
      longName: "6th Dan"
    },
    {
      id: 16,
      shortName: "7D",
      longName: "7th Dan"
    },
    {
      id: 17,
      shortName: "8D",
      longName: "8th Dan"
    },
    {
      id: 18,
      shortName: "9D",
      longName: "9th Dan"
    }];

    constructor() {}

    getShortDisplayName(id){
      return this.grades[id].shortName;
    }

    getLongDisplayName(id){
      return this.grades[id].longName;
    }

    getAllGrades() {
      return this.grades;
    }
}