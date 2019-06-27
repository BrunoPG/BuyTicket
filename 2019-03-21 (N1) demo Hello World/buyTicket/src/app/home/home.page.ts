import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Evento } from "../configuracao"
import { ProviderService } from '../provider.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  listaEventos: Array<Evento>;
  constructor(public NavCtrl: NavController,
    public provider: ProviderService) {

    provider.GetListaEventos().then(eventos => {
      this.listaEventos = eventos;
    })
  }
  openEvento() {
    this.NavCtrl.navigateForward('cadastro-evento')
  }


  vender(idEvento) {
    console.log(idEvento)
    this.NavCtrl.navigateForward("venda-ingresso/" + idEvento)

  }
}
