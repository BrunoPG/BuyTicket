import { Component, OnInit, Input } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { Sala } from '../configuracao';
import { ProviderService } from '../provider.service';
import { ViewController } from '@ionic/core';

@Component({
  selector: 'app-cadastro-sala',
  templateUrl: './cadastro-sala.page.html',
  styleUrls: ['./cadastro-sala.page.scss'],
})
export class CadastroSalaPage implements OnInit {

  @Input() value: number;
  colunas = 0;
  fileiras = 0;

  setor: Array<Array<Number>>;
  sala: Sala 
  constructor(navParams: NavParams, 
    public navCtrl: NavController, 
    public provider: ProviderService,
    public viewCtrl : ViewController) {

     this.provider.GetSala(navParams.data.value).then(sala=>{
      this.sala = sala
    }).catch(SalaVazia=>{
      this.sala = SalaVazia
    })

  }

  ngOnInit() {
  }

  salvar() {

  }

  sair() {
    //this.viewCtrl.dismiss();
  }

  excluir() {

  }

  criarAcentos(filas: Number) {
    this.setor = new Array();
  }

}
