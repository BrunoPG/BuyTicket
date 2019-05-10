import { Component, OnInit, Input } from '@angular/core';
import { NavParams, NavController, ModalController } from '@ionic/angular';
import { Setor } from '../configuracao';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-setor',
  templateUrl: './cadastro-setor.page.html',
  styleUrls: ['./cadastro-setor.page.scss'],
})
export class CadastroSetorPage implements OnInit {

  setor: Setor;
  Form: any

  constructor(private navParams: NavParams,
    private modalController: ModalController,
    formBuilder: FormBuilder) {

    this.setor = this.navParams.get('componentProps');
    this.Form = formBuilder.group({
      codigoF: ['', Validators.required],
      nomeF: ['', Validators.required],
      fileiras: ['', Validators.compose([Validators.maxLength(3)])],
      colunas: ['', Validators.compose([Validators.maxLength(3)])]
    });
  }

  ngOnInit() {
  }

  Excluir() {
    this.setor = null;
    this.myDismiss();
  }

  Salvar() {
    this.setor.codigo = this.Form.codigoF;
    this.setor.nome = this.Form.nomeF;
    this.setor.qtd_fileira = this.Form.fileiras;
    this.setor.qtd_colunas = this.Form.colunas;
    this.myDismiss();
  }
  async myDismiss() {
    await this.modalController.dismiss(this.setor);
  }

  Sair() {

  }



}
