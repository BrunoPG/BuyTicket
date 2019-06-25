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
  cor = ['primary', 'secondary', 'danger', 'medium']
  corAcento = ['cornflowerblue', 'cyan', 'red', 'darkgray']
  tipoAtual = 0;
  constructor(private navParams: NavParams,
    // private modalController: ModalController,
    public provider: ProviderService,
    public navCtrl: NavController,
    public activatedRoute: ActivatedRoute,
    public route: Router
  ) {
    this.tipoAtual = 0;
    this.setor = new Setor();

  }

  ngOnInit() {

    let l_sala;//= Number(this.activatedRoute.snapshot.paramMap.get('sala'))
    let l_setor;// = Number(this.activatedRoute.snapshot.paramMap.get('setor'))
    l_sala = this.route.getCurrentNavigation().extras.state;
    if (l_setor > 0) {
      this.provider.GetSetor(l_setor).then(s => {
        this.setor = s;
        this.provider.GetAssentos(this.setor.id).then(assentos => {
          this.assentos = assentos
        })
      })
    } else {
      this.setor = new Setor()
      this.setor.sala_id = l_sala.id;
    }

  }

  async excluir() {
    if (this.setor.id > 0)
      this.provider.ExcluirSetor(this.setor.id)
    // await this.modalController.dismiss();
    this.navCtrl.back();
  }


  async salvar() {
    this.provider.SalvarSetor(this.setor).then(setor => {
      this.definirAssentos(setor.id)
      this.provider.SalvarAssentosSetor(this.assentos).then(() => {
        alert("Setor " + setor.nome + " salvo com sucesso!");
      }).catch(erro => {
        alert("Erro ao salvar setor: " + erro);
      })
    }).catch((erro) => {
      alert("Erro ao salvar setor: " + erro);
    })
    // this.modalController.dismiss();
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

  definirAssentos(id_Setor) {
    this.provider.DeletaAssentos(id_Setor).then(() => {
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
            ac[i].setor_id = id_Setor;
            ac[i].linha = i + 1
            ac[i].coluna = this.coluna(row);
            ac[i].tipo_id = this.tipoAtual;
            ac[i].status_id = 1;
            i++
          }
          this.assentos.push(ac);
          row++;
        }
      }
    })
  }


}
