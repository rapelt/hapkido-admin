import { Component } from '@angular/core';
import {ToastController} from 'ionic-angular';
import {ToastEvents} from '../../services/toast.events';

/**
 * Generated class for the ToastComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'toast',
  templateUrl: 'toast.html'
})
export class ToastComponent {

  constructor(public toastEvents: ToastEvents, public toastCtrl: ToastController) {
    toastEvents.updateToast.subscribe((message: string) => {
      this.presentToast(message);
    });

  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
