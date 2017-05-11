import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { RegistrosPage } from '../pages/registros/registros';
import { ConsultarRegistroPage } from '../pages/consultar-registro/consultar-registro';
import {ResultadoConsultaPage}  from '../pages/resultado-consulta/resultado-consulta'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Camera} from '@ionic-native/camera';
import firebase from 'firebase';

let firebaseConfig = {
  apiKey: "AIzaSyB7uEXoxpYVa6zkELLY2O3BQw35-Vl02q0",
  authDomain: "los-amigos-sorveteria.firebaseapp.com",
  databaseURL: "https://los-amigos-sorveteria.firebaseio.com",
  projectId: "los-amigos-sorveteria",
  storageBucket: "los-amigos-sorveteria.appspot.com",
  messagingSenderId: "168204075969"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CadastroPage,
    RegistrosPage,
    ConsultarRegistroPage,
    ResultadoConsultaPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CadastroPage,
    RegistrosPage,
    ConsultarRegistroPage,
    ResultadoConsultaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
  constructor(){
     firebase.initializeApp(firebaseConfig);
  }
}
