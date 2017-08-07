import { NgModule } from '@angular/core';
import { EnvVariables } from "./enviroment.token";
import { devVariables } from './dev';
import { prodVariables } from './prod';
import { stagingVariables } from './staging';
import { localVariables } from './local';


declare const process: any; // Typescript compiler will complain without this

export function environmentFactory() {
  if(process.env.NODE_ENV === 'prod'){
    return prodVariables;
  }

  if(process.env.NODE_ENV === 'staging'){
    return stagingVariables;
  }

  if(process.env.NODE_ENV === 'local'){
    return localVariables;
  }

  return devVariables;
}

@NgModule({
  providers: [
    {
      provide: EnvVariables,
      // useFactory instead of useValue so we can easily add more logic as needed.
      useFactory: environmentFactory
    }
  ]
})
export class EnvironmentsModule {}