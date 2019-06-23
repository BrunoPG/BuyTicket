import { Component, OnInit } from '@angular/core';
import { Setor, Acento, Sala } from '../configuracao';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-venda-ingresso',
  templateUrl: './venda-ingresso.page.html',
  styleUrls: ['./venda-ingresso.page.scss'],
})
export class VendaIngressoPage implements OnInit {

  cor = ['primary', 'secondary', 'danger', 'medium']
  acentos: Array<Array<Acento>>;
  constructor(public NavCtrl: NavController) {

    this.acentos = new Array<Array<Acento>>();
    //let id_Evento: any;
    //id_Evento = this.activatedRoute.snapshot.paramMap.get('id_evento')   
    var i: number;
    var J: number;
    i = 0;
    J = 0;

    console.log("teste")
    while (i < 10) {
      J = 1;
      let ac = Array<Acento>()
      while (J < 50) {
        ac[J] = new Acento();
        ac[J].i = i
        ac[J].j = J
        ac[J].tipo = 0
        ac[J].ativo = true;
        J++

      }
      i ++;
      this.acentos.push(ac);
    }
  }

  ngOnInit() {
  }

  finalizaVenda(){
    this.NavCtrl.navigateForward("venda-preco")
  }

}
