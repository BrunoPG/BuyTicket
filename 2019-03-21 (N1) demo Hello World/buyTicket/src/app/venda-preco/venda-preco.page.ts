import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProviderService } from '../provider.service';
import { Venda } from '../configuracao';

@Component({
  selector: 'app-venda-preco',
  templateUrl: './venda-preco.page.html',
  styleUrls: ['./venda-preco.page.scss'],
})
export class VendaPrecoPage implements OnInit {

  venda: Venda
  constructor(public provider: ProviderService, public activatedRoute: ActivatedRoute) {
    // let id_Evento = this.activatedRoute.snapshot.paramMap.get('idevento')
    // this.provider.GetVenda(id_Evento).then(venda => {
    //   this.venda = venda
    // })
  }

  ngOnInit() {
  }

}
