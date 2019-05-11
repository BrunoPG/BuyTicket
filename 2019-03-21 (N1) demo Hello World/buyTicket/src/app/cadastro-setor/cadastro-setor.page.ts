import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Setor } from '../configuracao';

@Component({
  selector: 'app-cadastro-setor',
  templateUrl: './cadastro-setor.page.html',
  styleUrls: ['./cadastro-setor.page.scss'],
})
export class CadastroSetorPage implements OnInit {

  setor: Setor;

  constructor(private navParams: NavParams,
    private modalController: ModalController) {

    this.setor = this.navParams.get('componentProps');

  }

  ngOnInit() {
  }

  async excluir() {
    await this.modalController.dismiss();
  }

  salvar() {
    this.myDismiss();
  }
  async myDismiss() {
    await this.modalController.dismiss(this.setor);
  }

}
