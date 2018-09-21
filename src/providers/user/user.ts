import { Injectable } from '@angular/core';
import firebase from 'firebase';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  public currentUser: firebase.User;

  constructor() {

  }

  getUserProfile() {
    return new Promise(resolve => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.currentUser = user;  
          resolve(this.currentUser);
        }
      });
    })
  }

  getUserProfileByUid(uid) {
    return firebase.database().ref('/users/' + uid);
  }

  setUser(uid: string) {
    firebase.database().ref('users').set({uid});
  }

  setUserData(uid: string, username: string) {
    firebase.database().ref('users/' + uid).update({username: username});
  }

  setMessage(uid: string, text: string) {
    let date = new Date();
    let today = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' ' + date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
    firebase.database().ref('messages/').push({text: text, emitter: uid, date: today});
  }
}
