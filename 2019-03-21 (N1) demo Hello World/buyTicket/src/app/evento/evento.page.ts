import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.page.html',
  styleUrls: ['./evento.page.scss'],
})
export class EventoPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }
  openEvento(){
    this.navCtrl.navigateForward('cadastro-evento')
   }

}
  
