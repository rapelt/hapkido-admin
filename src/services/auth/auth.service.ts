import * as firebase from 'firebase';

export class AuthService {
  signup (username: string, pin: string){
    return firebase.auth().createUserWithEmailAndPassword(username + '@hapkidobrisbane.com.au', pin + '0000');
  }
}