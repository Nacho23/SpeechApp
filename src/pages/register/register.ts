import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { WallPage } from '../wall/wall';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  isChecked = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public authProvider: AuthProvider) {
  }

  loginUser(username) {
    console.log(username);
    if(!this.isChecked){
      this.authProvider.loginUser();
      this.navCtrl.setRoot(HomePage, {username: username});
    }
    else 
    {
      this.navCtrl.setRoot(WallPage);
    }
  }

  checkValue(event: any){
    console.log(event);
    this.isChecked = event;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
