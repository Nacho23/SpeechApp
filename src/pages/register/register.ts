import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

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
    public authProvider: AuthProvider, private alertCtrl: AlertController) {
  }

  loginUser(username) {
    console.log(username);
    if (!this.isChecked) {
      if (username != undefined) {
        this.authProvider.loginUser();
        this.navCtrl.setRoot(HomePage, { username: username });
      } else {
        let alert = this.alertCtrl.create({
          title: 'ERROR',
          subTitle: 'Debe ingresar un nombre de usuario válido',
          buttons: ['Aceptar']
        });
        alert.present();
      }
    }
    else {
      this.navCtrl.setRoot("WallPage");
    }
  }

  checkValue(event: any) {
    console.log(event);
    this.isChecked = event;
  }

  loginUserWithFacebook() {
    console.log("Conectar con Facebook");
  }

  loginUserWithTwitter() {
    console.log("Conectar con Twitter");
  }

  loginUserWithGoogle() {
    console.log("Conectar con Google Plus");
  }
}
