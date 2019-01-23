import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MessageProvider } from '../../providers/message/message';
import { UserProvider } from '../../providers/user/user';

import { Vibration } from '@ionic-native/vibration';

/**
 * Generated class for the WallPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wall',
  templateUrl: 'wall.html',
})
export class WallPage {

  public messageList: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private messageProvider: MessageProvider, private userProvider: UserProvider,
  private alertCtrl: AlertController, private vibration: Vibration) {

    this.messageProvider.getMessages().on('value', snap => {
      console.log(snap.val());
      this.messageList = [];
      snap.forEach(snapMsg => {
        let messageObject = snapMsg.val();
        messageObject.uid = snapMsg.key;
        this.userProvider.getUserProfileByUid(messageObject.emitter).on('value', snapUser => {
          messageObject.emitterName = snapUser.val().username;
          this.messageList.push(messageObject);
          this.vibration.vibrate(500);
        })
        return false;
      })
    })
  }

  deleteMessages() {
    let alert = this.alertCtrl.create({
      title: 'ATENCIÓN',
      message: '¿Seguro desea eliminar TODOS los mensajes?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            console.log('Eliminar Mensajes');
            this.messageProvider.deleteMessages();
          }
        }
      ]
    });
    alert.present();
  }

}
