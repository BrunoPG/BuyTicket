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

  }

  ngOnInit() {

    let l_sala = this.navParams.get('sala');
    let l_setor = this.navParams.get('setor');
    
    this.provider.GetSetor(l_sala, l_setor).then(s => {
      if (s != null) {
        this.setor = new Setor()
        this.setor.nome = s.nome;
        this.setor.descricao = s.descricao
        this.setor.qtd_coluna = s.qtd_coluna
        this.setor.qtd_fileira = s.qtd_fileira
        this.setor.id = s.id
        //this.setor.acentos = s.acentos
      } else {
        this.setor = new Setor()
      }
    })

  }

  async excluir() {
    let acao: any = {
      acao: 2,
      obj: this.setor
    }
    await this.modalController.dismiss(acao);

  }


  async salvar() {
    let acao: any = {
      acao: 0,
      obj: this.setor
    }
    await this.modalController.dismiss(acao);
  }

  setTipoAtual(tipo: number) {
    this.tipoAtual = tipo
  }

  dismiss() {
    let acao: any = {
      acao: 4,
      obj: this.setor
    }
    this.modalController.dismiss(acao);
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
