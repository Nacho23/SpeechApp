import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { UserProvider } from '../../providers/user/user';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  public isValid: boolean;

  ngOnInit(): void {
    if(this.isSpeechSupported) {
      this.getPermission();
      if(this.hasPermission){
        this.isValid = true;
      } else {
        console.log("No tiene los permisos");
      }
    } else {
      console.log("No Soportado");
    }
  }

  public text;
  public currentUser;

  constructor(private speech: SpeechRecognition, public navCtrl: NavController,
  private userProvider: UserProvider, public navParams: NavParams, private alertCtrl: AlertController) {

    let alert = this.alertCtrl.create({
      title: 'RECUERDA',
      subTitle: 'Hablar al microfono del telefono, generalmente ubicando en la parte inferior del dispositivo. Además, decir frases cortas y bien pronunciadas',
      buttons: ['Aceptar']
    });
    alert.present();

    this.userProvider.getUserProfile().then(user => {
      this.currentUser = user;
      this.userProvider.setUserData(this.currentUser.uid, this.navParams.get('username'));
    })
  }

  listenForSpeech(): void {
    if(this.isValid){
      this.speech.startListening().subscribe(
        data => {
          //console.log(data[0]),  
          this.text = data[0];
          this.userProvider.setMessage(this.currentUser.uid, data[0]);
        },
        error => 
          console.error(error)
      )
    } else {
      console.log("Asegurate de que tu dispositivo soporte la tecnología y tenga permisos para su uso");
      this.isValid = false;
    }
  }

  async isSpeechSupported():Promise<boolean> {
    const isAvailable = await this.speech.isRecognitionAvailable();
    console.log(isAvailable);
    return isAvailable;
  }

  async getPermission():Promise<void>{
    try {
      const permission = await this.speech.requestPermission();
      console.log(permission);
      return permission;
    } catch(e) {
      console.error(e);
    }
  }

  async hasPermission():Promise<boolean>{
    try{
      const permission = await this.speech.hasPermission();
      console.log(permission);
      this.isValid = true;
      return permission;
    } catch(e) {
      console.error(e);
    }
  }

  async getSuppotedLanguages():Promise<Array<string>>{
    try{
      const languages = await this.speech.getSupportedLanguages();
      console.log(languages);
      return languages;
    } catch(e) {
      console.error(e);
    }
  }  

}
