export class NavParamsMock {
    static returnParams: any = {};

    public get(key): any {
        if (NavParamsMock.returnParams[key]) {
            return NavParamsMock.returnParams[key];
        } else {
            return;
        }
    }

    static setParams(key,value){
        NavParamsMock.returnParams[key] = value;
    }

    static resetParams(){
        NavParamsMock.returnParams = {};
    }
}