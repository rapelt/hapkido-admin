export class Name {
    constructor(
        public firstname: string,
        public lastname: string

    ){}

    displayName () {
            return this.firstname + " " + this.lastname;
    }
}