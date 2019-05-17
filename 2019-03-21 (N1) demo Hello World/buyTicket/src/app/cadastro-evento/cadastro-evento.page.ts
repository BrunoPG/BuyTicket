import { Component, OnInit } from '@angular/core';
import { Evento, Sala } from '../configuracao';
import { ProviderService } from '../provider.service';
import { ActivatedRoute } from '@angular/router';
import { NavParams, NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro-evento',
  templateUrl: './cadastro-evento.page.html',
  styleUrls: ['./cadastro-evento.page.scss'],
})
export class CadastroEventoPage implements OnInit {

  evento: Evento

  salas: Array<Sala>;
  constructor(private navParams: NavParams,
    private provider: ProviderService,
    private NavCtrl: NavController,
    private modal: ModalController) {

    let codEvento = this.navParams.get('evento');
    console.log(codEvento)
    provider.GetEvento(Number(codEvento)).then(evento => {
      this.evento = evento;
    });

    this.salas = this.provider.GetListaSalas();

  }

  ngOnInit() {
  }

  salvar() {
    this.provider.Addevento(this.evento);
    this.modal.dismiss();
  }

  excluir() {
    this.provider.DeleteEvento(this.evento);
    this.modal.dismiss();
  }


}
