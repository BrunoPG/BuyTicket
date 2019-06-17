import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Setor, Acento, Sala } from '../configuracao';
import { ProviderService } from '../provider.service';

@Component({
  selector: 'app-cadastro-setor',
  templateUrl: './cadastro-setor.page.html',
  styleUrls: ['./cadastro-setor.page.scss'],
})
export class CadastroSetorPage implements OnInit {

  setor: Setor;
  cor = ['primary', 'secondary', 'danger', 'medium']
  tipoAtual = 0;
  constructor(private navParams: NavParams,
    private modalController: ModalController,
    public provider: ProviderService
  ) {

    this.setor = new Setor();
  }

  ngOnInit() {

    let l_sala = this.navParams.get('sala');
    let l_setor = this.navParams.get('setor');
    console.log(l_setor)
    if (l_setor > 0) {
      this.provider.GetSetor(l_setor).then(s => {
        this.setor = s;
      })
    } else {
      this.setor = new Setor()
      this.setor.sala_id = l_sala;
    }

  }

  async excluir() {
    if (this.setor.id > 0)
      this.provider.ExcluirSetor(this.setor.id)
    await this.modalController.dismiss();

  }


  async salvar() {
    if (this.setor.id == 0) {
      this.provider.SalvarSetor(this.setor).then(setor => {
        alert("Setor " + setor.nome + " salvo com sucesso!");
      }).catch((erro) => {
        alert("Erro ao salvar setor: " + erro);
      })      
    }else{
      this.provider.EditarSetor(this.setor).then(setor => {
        alert("Setor " + setor.nome + " salvo com sucesso!");
      }).catch((erro) => {
        alert("Erro ao salvar setor: " + erro);
      })
    }
    this.modalController.dismiss();
  }

  setTipoAtual(tipo: number) {
    this.tipoAtual = tipo
  }


  mudarTipo(acento: Acento) {
    acento.tipo = this.tipoAtual
  }

  definirAcentos() {

    if (this.setor.qtd_fileira > 0 && this.setor.qtd_coluna > 0) {
      //this.setor.acentos = [];
      let row = 0

      let tamFil = this.setor.qtd_fileira as number;
      let tamCol = this.setor.qtd_coluna as number;
      while (row < tamFil) {
        let ac = Array<Acento>(tamCol)
        let i = 0;
        while (i < ac.length) {
          ac[i] = new Acento();
          ac[i].i = i
          ac[i].j = row
          ac[i].tipo = 0
          ac[i].ativo = true;
          i++
        }
        //this.setor.acentos.push(ac);
        row++;
      }
    }
  }


}
