import { Component, OnInit } from '@angular/core';
import { Evento, Sala } from '../configuracao';
import { ProviderService } from '../provider.service';
import { ActivatedRoute } from '@angular/router';
import { NavParams, NavController, ModalController, ActionSheetController, PickerController } from '@ionic/angular';
import { now } from 'moment';

@Component({
  selector: 'app-cadastro-evento',
  templateUrl: './cadastro-evento.page.html',
  styleUrls: ['./cadastro-evento.page.scss'],
})
export class CadastroEventoPage implements OnInit {

  evento: Evento
  listaSalas: Array<Sala>
  constructor(
    public provider: ProviderService,
    public NavCtrl: NavController,
    public pickerCtrl: PickerController,
    public activatedRoute: ActivatedRoute) {
    this.listaSalas = new Array<Sala>();
    this.evento = new Evento();
  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    let codEvento = this.activatedRoute.snapshot.paramMap.get('idevento')
    if (Number(codEvento) > 0) {
      this.provider.GetEvento(Number(codEvento)).then(evento => {
        this.evento = evento;
      });
    }
    this.provider.GetListaSalas().then((salas: any) => {
      this.listaSalas = salas
    })

    this.evento.salas.push(this.listaSalas[0])
  }

  compareWith(sala) {
    return true
  }

  limite() {
    return new Date().getFullYear() + 2
  }

  Data(date) {
    let data = (new Date(date)).toLocaleDateString("pt-BR")
    return data

  }



  AddRemoverSala(sala: Sala) {
    console.log("foi")
    let ind = this.evento.salas.indexOf(sala)
    if (ind >= 0)
      this.listaSalas.splice(ind, 1);
    else
      this.evento.salas.push(sala)
  }

  salvar() {
    this.provider.SalvarEvento(this.evento).then((result: any) => {
      if (this.evento.id > 0) {
        this.provider.SalvarSalaEvento(this.evento.id, this.listaSalas).then(result => {

        }).catch(erro => {
          alert("Erro ao salvar salas")
        })
      } else {
        this.provider.SalvarSalaEvento(result.id, this.listaSalas).then(result => {

        }).catch(erro => {
          alert("Erro ao salvar salas")
        })
      }
    });
    this.NavCtrl.back();
  }

  excluir() {
    this.provider.DeleteEvento(this.evento);
    this.NavCtrl.back()
  }

  customAlertOptions: any = {
    header: 'Salas do evento',
    subHeader: 'Selecione as salas do evento',
    translucent: true
  };


}

