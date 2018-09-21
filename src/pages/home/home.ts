import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public text;
  public currentUser;

  constructor(private speech: SpeechRecognition, public navCtrl: NavController,
  private userProvider: UserProvider, public navParams: NavParams) {
    this.userProvider.getUserProfile().then(user => {
      this.currentUser = user;
      this.userProvider.setUserData(this.currentUser.uid, this.navParams.get('username'));
    })
  }

  listenForSpeech(): void {
    this.speech.startListening().subscribe(
      data => 
        //console.log(data[0]),  
        //this.text = data[0],
        this.userProvider.setMessage(this.currentUser.uid, data[0]),
      error => 
        console.error(error)
    )
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
