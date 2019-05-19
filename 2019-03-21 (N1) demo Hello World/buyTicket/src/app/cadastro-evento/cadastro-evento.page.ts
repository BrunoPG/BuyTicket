import { Component, OnInit } from '@angular/core';
import { Evento, Sala } from '../configuracao';
import { ProviderService } from '../provider.service';
import { ActivatedRoute } from '@angular/router';
import { NavParams, NavController, ModalController, ActionSheetController, PickerController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro-evento',
  templateUrl: './cadastro-evento.page.html',
  styleUrls: ['./cadastro-evento.page.scss'],
})
export class CadastroEventoPage implements OnInit {

  evento: Evento
  constructor(private navParams: NavParams,
    private provider: ProviderService,
    private NavCtrl: NavController,
    private modal: ModalController,
    public pickerCtrl: PickerController,
    private actionSheetController: ActionSheetController) {

    let codEvento = this.navParams.get('evento');
    console.log(codEvento)
    provider.GetEvento(Number(codEvento)).then(evento => {
      this.evento = evento;
    });


  }

  ngOnInit() {
  }

  removerSala(sala: Sala) {
    let ind = this.evento.salas.indexOf(sala)
    this.evento.salas.splice(ind, 1);
  }

  salvar() {
    this.provider.Addevento(this.evento);
    this.modal.dismiss();
  }

  excluir() {
    this.provider.DeleteEvento(this.evento);
    this.modal.dismiss();
  }

  async presentActionSheet() {
    let salas = this.provider.GetSalaNaoEventos(this.evento)
    let butao = [];

    if (salas.length > 0) {
      salas.forEach(s => {
        butao.push({
          text: s.nome,
          icon: 'md-albums',
          handler: () => {
            this.evento.salas.push(s);
          }
        })
      })
      const actionSheet = await this.actionSheetController.create({
        header: 'Salas',
        buttons: butao
      });
      await actionSheet.present();
    }
  }

  /*async presentActionSheet() {

    let salas = this.provider.GetSalaNaoEventos(this.evento)
    let opt = [];
    salas.forEach(s => {
      opt.push({
        text: s.nome,
        value: 'md-albums',
        handler: () => {
          this.evento.salas.push(s);
        }
      })
    })  

    const picker = await this.pickerCtrl.create({
      buttons: [{
        text: 'Salvar',
      }],
      columns: [
        {
          name: 'Salas',
          options: opt
        }
      ]
    });
    await picker.present();

  
  }*/


}
