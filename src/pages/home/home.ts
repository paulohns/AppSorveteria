import { Component, NgZone, OnInit } from '@angular/core';

import { NavController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { CadastroPage } from '../cadastro/cadastro';
import { RegistrosPage } from '../registros/registros';
import {ConsultarRegistroPage} from '../consultar-registro/consultar-registro'
import {Camera} from '@ionic-native/camera';
import firebase from 'firebase'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  
  currentUser : any;
  credentials : {email?: string, password?: string} = {};

  profile_picture: string;
  profileRef: any;
  toastCtrl: ToastController;

  constructor(public navCtrl: NavController, public ngZone: NgZone, toastCtrl: ToastController) {
    this.ngZone = ngZone;
    this.profile_picture = null;
    this.toastCtrl = toastCtrl;
  }
  
  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      _currentUser => {
        this.ngZone.run(
          () => {
            if(_currentUser){
              this.currentUser = _currentUser;
              this.profileRef = 
                firebase.database()
                  .ref('profile/'+ firebase.auth().currentUser.uid + 'profile_picture');

              this.profileRef.on('value', snapshot => this.updateImage(snapshot));

            } else {
              this.currentUser = null;
            }
          }
        )
      }
    );    
  }

  /*
  takePicture(){
    this.camera.getPicture({
      quality: 50,
      allowEdit: true,
      cameraDirection: this.camera.Direction.FRONT,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then(
      imageData => { 
        firebase.database()
            .ref('profile/'+ firebase.auth().currentUser.uid).update({profile_picture: imageData});
      }
    )
  }
*/
  goToRegistros(){
    //ir para a tela de registros
    this.navCtrl.push(RegistrosPage, {usuarioLogado: this.currentUser.email})
  }

  goToConsulta(){
    //ir para a tela de consultas
    this.navCtrl.push(ConsultarRegistroPage);
  }

  updateImage(value){
    if(value != null){ 
      this.profile_picture = 'data:image/jpeg;base64,' + value.val(); 
    } else { 
      this.profile_picture = null 
    }
  }

  doLogin(_credentials){
    if(_credentials.valid){
      firebase.auth().signInWithEmailAndPassword(
        _credentials.value.email, _credentials.value.password)
    }
  }

  doLogout(){
    firebase.auth().signOut();
    this.currentUser = null;
  }

  doCadastro(){
    this.navCtrl.setRoot(CadastroPage);
  }

  /*verificaConexao(){
    var connectedRef = firebase.database().ref(".info/connected");
    var conectado;
    connectedRef.on("value", function(snap) {
      conectado = snap.val() != true;
    });

    if (conectado) {
        this.showToast("Você não está conectado na internet");
    }
  }*/

  showToast(position: string) {
    let toast = this.toastCtrl.create({
      message: 'Mmmm, buttered toast',
      duration: 2000,
      position: position
    });

    toast.present(toast);
  }

  public showToastMessage(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });

    toast.present(toast);
  }

  showToastWithCloseButton() {
    const toast = this.toastCtrl.create({
      message: 'Your files were successfully saved',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

  showLongToast() {
    let toast = this.toastCtrl.create({
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea voluptatibus quibusdam eum nihil optio, ullam accusamus magni, nobis suscipit reprehenderit, sequi quam amet impedit. Accusamus dolorem voluptates laborum dolor obcaecati.',
      duration: 2000,
    });
    toast.present();
  }
}
