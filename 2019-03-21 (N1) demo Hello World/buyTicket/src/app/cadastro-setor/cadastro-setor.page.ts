import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, NavController } from '@ionic/angular';
import { Setor, Assento, Sala } from '../configuracao';
import { ProviderService } from '../provider.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-setor',
  templateUrl: './cadastro-setor.page.html',
  styleUrls: ['./cadastro-setor.page.scss'],
})
export class CadastroSetorPage implements OnInit {

  setor: Setor;
  assentos: Array<Array<Assento>>;
  cor = ['primary', 'secondary', 'tertiary', 'success', 'danger','vendido']
  tipoAtual = 0;
  constructor(
    // private modalController: ModalController,
    public provider: ProviderService,
    public navCtrl: NavController,
    public activatedRoute: ActivatedRoute,
    public route: Router
  ) {
    this.tipoAtual = 1;
    this.setor = new Setor();

  }

  ngOnInit() {

    let l_setor = Number(this.activatedRoute.snapshot.paramMap.get('setor'))
    let l_sala = Number(this.activatedRoute.snapshot.paramMap.get('sala'))
    if (l_setor > 0) {
      this.provider.GetSetor(l_setor).then(s => {
        this.setor = s;
        this.provider.GetAssentos(this.setor.id).then(assentos => {
          this.assentos = assentos
        })
      })
    } else {
      this.setor = new Setor()
      this.setor.sala_id = l_sala;
    }

  }

  async excluir() {
    if (this.setor.id > 0)
      this.provider.ExcluirSetor(this.setor.id)
    this.navCtrl.back();
  }


  async salvar() {
    this.provider.SalvarSetor(this.setor).then(setor => {
      this.assentos.forEach(linhas => {
        linhas.forEach(assentos => {
          assentos.setor_id = this.setor.id;
        })
      });
      this.provider.DeletaAssentos(this.setor.id).then(() => {
        this.provider.SalvarAssentosSetor(this.assentos).then(() => {
          alert("Setor " + setor.nome + " salvo com sucesso!");
        }).catch(erro => {
          alert("Erro ao salvar setor: " + erro);
        })
      }).catch(Erro=>{
        alert("Erro ao salvar setor: " + Erro);
      })
    }).catch((erro) => {
      alert("Erro ao salvar setor: " + erro);
    })
    this.navCtrl.back();
  }

  setTipoAtual(tipo: number) {
    this.tipoAtual = tipo
  }


  mudarTipo(assento: Assento) {
    assento.tipo_id = this.tipoAtual
  }

  coluna(index): string {
    let ABC = "ABCDEFGHIJKLMNOPQSRTUWXYZ";
    let coluna = "";
    let i = index;
    if (index >= 25) {
      coluna = this.coluna(index - 25);
      i = 0;
    }
    coluna = ABC[i] + coluna;

    return coluna
  }

  definirAssentos() {
    this.provider.DeletaAssentos(this.setor.id).then(() => {
      if (this.setor.qtd_fileira > 0 && this.setor.qtd_coluna > 0) {
        this.assentos = [];
        let row = 0
        let tamFil = this.setor.qtd_fileira as number;
        let tamCol = this.setor.qtd_coluna as number;

        while (row < tamFil) {
          let ac = Array<Assento>(tamCol)
          let i = 0;
          while (i < ac.length) {
            ac[i] = new Assento();
            ac[i].setor_id = this.setor.id;
            ac[i].linha = i + 1
            ac[i].coluna = this.coluna(row);
            ac[i].tipo_id = this.tipoAtual
            i++
          }
          this.assentos.push(ac);
          row++;
        }
      }
    })
  }


}
