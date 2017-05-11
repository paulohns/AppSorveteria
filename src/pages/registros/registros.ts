import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import {RegistroService} from '../../app/registro.service';
import {Registro} from '../../app/component/registro'

/*
  Generated class for the Registros page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-registros',
  templateUrl: 'registros.html',
  providers: [RegistroService]
})
export class RegistrosPage {

  registro: { data?: Date, 
      valorDinheiro?: string, 
      valorCartao?: string, 
      responsavel?: string, 
      descricao?: string,
      finalidade?: string;
  } = {};
  toastCtrl: ToastController;

  constructor(public navCtrl: NavController, public navParams: NavParams, toastCtrl: ToastController,private registroService: RegistroService) {
    this.registro.data = new Date();
    this.registro.responsavel = navParams.get('usuarioLogado');
    this.toastCtrl = toastCtrl;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrosPage');
  }

  doSalvar(_registro){
    

    this.registroService.addData(_registro);

    //chamar serviço para salvar
    
    this.showToastWithCloseButton();

    this.registro.valorDinheiro = '';
    this.registro.valorCartao = '';
    this.registro.descricao = '';
    this.registro.finalidade = '';

    /*let reg : Registro;
    reg.data = _registro.value.data;
    reg.valorDinheiro = _registro.value.valorDinheiro;
    reg.responsavel = _registro.value.responsavel;
    reg.descricao = _registro.value.descricao;
    reg.valorCartao = _registro.value.valorCartao;*/

  }

  public showToastWithCloseButton() {
    const toast = this.toastCtrl.create({
      message: 'O registro foi salvo!',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

}
