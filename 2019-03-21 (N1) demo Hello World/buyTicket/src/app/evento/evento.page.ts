import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ProviderService } from '../provider.service';
import { Evento } from '../configuracao';
import { CadastroEventoPage } from '../cadastro-evento/cadastro-evento.page';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.page.html',
  styleUrls: ['./evento.page.scss'],
})
export class EventoPage implements OnInit {

  eventos = new Array<Evento>()

  constructor(public navCtrl: NavController,
    public provider: ProviderService,
    public modal: ModalController) {

    this.eventos = provider.GetListaEventos();

  }

  ngOnInit() {
  }
  async openEvento(cod: Number) {

    const modalEvento = await this.modal.create({
      component: CadastroEventoPage,
      componentProps: { evento: cod }
    });

    await modalEvento.present();
  }


}

