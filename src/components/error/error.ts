import { Component } from '@angular/core';
import {ErrorEvents} from '../../services/error.events';
import {ToastController} from 'ionic-angular';

@Component({
  selector: 'error-message',
  templateUrl: 'error.html'
})
export class ErrorComponent {

  constructor(public errorEvents: ErrorEvents, public toastCtrl: ToastController) {
    errorEvents.updateError.subscribe((error: string) => {
      this.presentToast(error);
    });

  }

  presentToast(errorMessage) {
    let toast = this.toastCtrl.create({
      message: errorMessage,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
