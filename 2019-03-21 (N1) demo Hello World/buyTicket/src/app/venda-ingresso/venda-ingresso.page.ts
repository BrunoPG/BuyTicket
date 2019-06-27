import { Component, OnInit } from '@angular/core';
import { Setor, Assento, Sala, Evento } from '../configuracao';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ProviderService } from '../provider.service';

@Component({
  selector: 'app-venda-ingresso',
  templateUrl: './venda-ingresso.page.html',
  styleUrls: ['./venda-ingresso.page.scss'],
})
export class VendaIngressoPage implements OnInit {

  cor = ['primary', 'secondary', 'tertiary', 'success', 'danger']
  assentos: Array<Array<Assento>>;
  setoressala: Array<Setor>
  salas: Array<Sala>
  evento: Evento
  selecao_assento = ""
  salaSelec: Number
  setorSelec: Number
  assentosSelec: Array<Assento>
  constructor(public NavCtrl: NavController, public activatedRoute: ActivatedRoute, public provider: ProviderService) {

    this.assentos = new Array<Array<Assento>>();
    this.setoressala = new Array<Setor>();
    this.salas = Array<Sala>();
    this.evento = new Evento();
    this.assentosSelec = new Array<Assento>()
    let id_Evento = this.activatedRoute.snapshot.paramMap.get('idevento')
    provider.GetEvento(Number(id_Evento)).then(evento => {
      this.evento = evento
      ///Na verdade tem que buscar apenas salas do evento
      provider.GetListaSalas().then(salas => {
        this.salas = salas
        this.salaSelec = 0;
        this.setorSelec = 0;
        // if (this.salas.length > 0) {
        //   this.salaSelec = this.salas[0].id
        //   this.provider.GetSetoresSala(this.salaSelec).then(setores => {
        //     this.setoressala = setores
        //     if (this.setoressala.length > 0) {
        //       this.setorSelec = this.setoressala[0].id
        //       this.provider.GetAssentos(this.setorSelec).then(assentos => {
        //         this.assentos = assentos
        //       })
        //     }
        //   })
        // }
      })
    })

  }

  ngOnInit() {
  }

  selecionaSala(sala) {
    this.setoressala = []
    this.salaSelec = sala.detail.value
    this.provider.GetSetoresSala(this.salaSelec).then(setores => {
      this.setoressala = setores
    })
  }

  selecionaSetor(setor) {
    this.assentos = []
    this.setorSelec = setor.detail.value
    this.provider.GetAssentos(this.setorSelec).then(assentos => {
      this.assentos = assentos
    })
  }

  selecionarAssento(assento) {
    let indx = this.assentosSelec.indexOf(assento)
    if (indx >= 0)
      this.assentosSelec.splice(indx, 1);
    else {
      this.assentosSelec.push(assento);
    }
  }
  finalizaVenda() {
    this.NavCtrl.navigateForward("venda-preco")
  }

}
