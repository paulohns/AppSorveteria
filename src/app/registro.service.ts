import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import firebase from 'firebase'
import {Registro} from './component/registro'

@Injectable()
export class RegistroService {
  http : Http;
  data : Object;

  constructor(http: Http) {
    this.http = http;
    this.data = null;
  }

  retrieveData() {
      var ref = firebase.database().ref("profile");
      ref.orderByKey().on("child_added", function(snapshot) {
        console.log(snapshot.val());
      });

      var usersRef = ref.child("profile");
      console.log(usersRef);
    /*this.http.get('./mocks/test.json')
    .subscribe(data => {
      this.data = data;
    });*/

  }

  addData(registro){
        /*data: registro.value.data,
        responsavel: registro.value.responsavel,*/
     var ref = firebase.database().ref("registro/");
     ref.push({
        valorDinheiro: registro.value.valorDinheiro, 
        valorCartao: registro.value.valorCartao,
        descricao: registro.value.descricao,
        finalidade: registro.value.finalidade
    });

  }

  getData() {
    return this.data;
  }
}