import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Sala } from '../configuracao';
import { ProviderService } from '../provider.service';


@Component({
  selector: 'app-sala',
  templateUrl: './sala.page.html',
  styleUrls: ['./sala.page.scss'],
})

export class SalaPage implements OnInit {



  salas: Array<Sala>;

  constructor(
    public modal: ModalController,
    public NavCtrl: NavController,
    public provider: ProviderService) {

    this.salas = provider.GetListaSalas();
  }

  ngOnInit() {
  }

  editarSala(codSala: number) {       
    this.NavCtrl.navigateForward('cadastro-sala/'+codSala)   
  }

}
