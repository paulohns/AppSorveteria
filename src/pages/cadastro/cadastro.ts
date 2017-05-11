import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import firebase from 'firebase';

/*
  Generated class for the Cadastro page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})
export class CadastroPage {

  public fireAuth: any;
  public userProfile: any;
  submitted = false;
  credentials: { email?: string, password?: string } = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('/profile');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  doRegister(_credentials) {

    this.fireAuth.createUserWithEmailAndPassword(_credentials.value.email, _credentials.value.password).then((newUser) => {
      this.fireAuth.signInWithEmailAndPassword(_credentials.value.email, _credentials.value.password).then((authenticatedUser) => {
        this.userProfile.child(authenticatedUser.uid).set({
          email: _credentials.value.email
        }).then(() => {
          this.navCtrl.setRoot(HomePage);
        });
  
      })
    }, (e) => {
      console.log(e)
    });
  }

}
