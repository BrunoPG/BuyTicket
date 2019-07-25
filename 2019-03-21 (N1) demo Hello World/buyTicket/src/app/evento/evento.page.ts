import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ProviderService } from '../provider.service';
import { Evento } from '../configuracao';
import { CadastroEventoPage } from '../cadastro-evento/cadastro-evento.page';
import { OverlayEventDetail } from '@ionic/core';
import * as moment from 'moment';
import "moment/locale/pt-br"

@Component({
  selector: 'app-evento',
  templateUrl: './evento.page.html',
  styleUrls: ['./evento.page.scss'],
})
export class EventoPage implements OnInit {

  eventos = new Array<Evento>()

  constructor(
    public navCtrl: NavController,
    public provider: ProviderService) {



  }

  ngOnInit() {

  }


  ionViewDidEnter() {
    this.provider.GetListaEventos().then(eventos => {
      this.eventos = eventos;
    }).catch(erro => {
      alert("Erro ao listar eventos: " + erro)
    });
  }
  openEvento(cod: Number) {
    this.navCtrl.navigateForward("cadastro-evento/" + cod)
  }


  Data(date) {
    let data = (new Date(date)).toLocaleDateString("pt-BR")
    return data

  }


}

