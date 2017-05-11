import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class DataService {
  http : Http;
  data : Object;

  constructor(http: Http) {
    this.http = http;
    this.data = null;
  }

  retrieveData() {
      var ref = firebase.database().ref("registro");
      ref.orderByKey().endAt("responsavel").on("child_added", function(snapshot) {
        console.log(snapshot.key);
      });
      console.log(ref);
    /*this.http.get('./mocks/test.json')
    .subscribe(data => {
      this.data = data;
    });*/

  }

  getData() {
    return this.data;
  }
}