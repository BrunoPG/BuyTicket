import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, NavController } from '@ionic/angular';
import { Setor } from '../configuracao';

@Component({
  selector: 'app-cadastro-setor',
  templateUrl: './cadastro-setor.page.html',
  styleUrls: ['./cadastro-setor.page.scss'],
})
export class CadastroSetorPage implements OnInit {

  setor: Setor;
  acentos: Array<Array<any>>;
  constructor(private navParams: NavParams,
    private modalController: ModalController,
  ) {

    this.setor = this.navParams.get('idSetor');
    this.acentos = Array<Array<Setor>>();



  }

  ngOnInit() {

    this.definirAcentos()
  }

  async excluir() {
    await this.modalController.dismiss();
  }


  async salvar() {
    await this.modalController.dismiss(this.setor);
  }

  dismiss() {
    console.log("saiu dismisse")
    this.modalController.dismiss(this.setor);
  }


  definirAcentos() {

    if (this.setor.qtd_fileira > 0 && this.setor.qtd_colunas > 0) {
      this.acentos = [];
      let row = 0

      let tamFil = this.setor.qtd_fileira;
      let tamCol = this.setor.qtd_colunas;
      while (row < tamFil) {
        let ac = Array<Number>(tamCol)
        let i = 0;
        while (i < ac.length) {
          ac[i] = i;
          i++
        }
        this.acentos.push(ac);
        row++;
      }
    }
  }


}
