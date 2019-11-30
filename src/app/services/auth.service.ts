import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {User} from "../shared/user.class";
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
public isLogged: any = false;
  constructor(public afauth: AngularFireAuth, private store: Store) {
    this.afauth.authState.subscribe(user => (this.isLogged = user));
  }

  //login
  async onLogin(user: User){
    try {
      return await this.afauth.auth.signInWithEmailAndPassword(user.email, user.password);
    }catch(error){
     console.log('Error on login', error);
      }
    }

    //register
    async onRegister(user: User){
    try{
      return await this.afauth.auth.createUserWithEmailAndPassword(user.email,user.password);
    }catch(error) {
      console.log('Error on register user', error);
    }
  }

   onForgotPassword(passwordResetEmail) {
    try {
      return this.afauth.auth.sendPasswordResetEmail(passwordResetEmail);
    }catch (error) {
      console.log('Error on forgot password user', error);
    }
  }
   onLogout(){
     return this.afauth.auth.signOut();
  }
}

