import { Injectable } from '@angular/core';
import firebase from 'firebase';

/*
  Generated class for the MessageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessageProvider {

  constructor() {
    console.log('Hello MessageProvider Provider');
  }

  getMessages() {
    return firebase.database().ref('/messages/');
  }

  deleteMessages() {
    return firebase.database().ref('/messages').remove()
      .then(res => {
        console.log("Borrado Exitosamente");
      })
      .catch(err => {
        console.log("Error: " + err.message);
      });
  }
}
