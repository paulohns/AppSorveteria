import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import firebase from 'firebase'

@Injectable()
export class ConsultaService {
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

  getData() {
    return this.data;
  }
}