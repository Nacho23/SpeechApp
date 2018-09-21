import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessageProvider } from '../../providers/message/message';
import { UserProvider } from '../../providers/user/user';

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
  private messageProvider: MessageProvider, private userProvider: UserProvider) {
    this.messageProvider.getMessages().on('value', snap => {
      console.log(snap.val());
      this.messageList = [];
      snap.forEach(snapMsg => {
        let messageObject = snapMsg.val();
        messageObject.uid = snapMsg.key;
        this.userProvider.getUserProfileByUid(messageObject.emitter).on('value', snapUser => {
          messageObject.emitterName = snapUser.val().username;
          this.messageList.push(messageObject);
        })
        return false;
      })
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WallPage');
  }

}
