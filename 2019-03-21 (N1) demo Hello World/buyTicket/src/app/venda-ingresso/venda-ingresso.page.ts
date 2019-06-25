import { Component, OnInit } from '@angular/core';
import { Setor, Assento, Sala } from '../configuracao';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-venda-ingresso',
  templateUrl: './venda-ingresso.page.html',
  styleUrls: ['./venda-ingresso.page.scss'],
})
export class VendaIngressoPage implements OnInit {

  cor = ['primary', 'secondary', 'danger', 'medium']
  assentos: Array<Array<Assento>>;
  constructor(public NavCtrl: NavController) {

    this.assentos = new Array<Array<Assento>>();
    //let id_Evento: any;
    //id_Evento = this.activatedRoute.snapshot.paramMap.get('id_evento')   
    var i: number;
    var J: number;
    i = 0;
    J = 0;

    console.log("teste")
    while (i < 10) {
      J = 1;
      let ac = Array<Assento>()
      while (J < 50) {
        ac[J] = new Assento();
        ac[J].coluna = i+""
        ac[J].linha = J
        ac[J].tipo_id = 0
        ac[J].status_id = 0;
        J++

      }
      i ++;
      this.assentos.push(ac);
    }
  }

  ngOnInit() {
  }

  finalizaVenda(){
    this.NavCtrl.navigateForward("venda-preco")
  }

}
