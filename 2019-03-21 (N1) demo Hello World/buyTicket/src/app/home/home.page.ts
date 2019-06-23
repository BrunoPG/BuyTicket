import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(public NavCtrl: NavController) {

  }
  openEvento() {
    this.NavCtrl.navigateForward('cadastro-evento')
  }


  vender() {
    this.NavCtrl.navigateForward("venda-ingresso")
  }
}
