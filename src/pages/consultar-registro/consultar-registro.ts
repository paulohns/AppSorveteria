import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ResultadoConsultaPage}  from '../resultado-consulta/resultado-consulta'
import {ConsultaService} from '../../app/consulta.service';


/*
  Generated class for the ConsultarRegistro page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-consultar-registro',
  templateUrl: 'consultar-registro.html',
  providers: [ConsultaService]
})
export class ConsultarRegistroPage {

  public filtro = {
    dataInicial: '',
    dataFinal: '',
    descricao: '',
    finalidade: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private consultaService: ConsultaService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsultarRegistroPage');
  }

  doPesquisar(_pesquisa){
    this.consultaService.retrieveData();
    this.navCtrl.push(ResultadoConsultaPage, {filtro: this.filtro})
  }

}
