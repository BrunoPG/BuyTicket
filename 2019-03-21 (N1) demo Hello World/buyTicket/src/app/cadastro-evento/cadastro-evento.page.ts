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

    let codEvento = this.activatedRoute.snapshot.paramMap.get('idevento')
    if (Number(codEvento) > 0) {
      this.provider.GetEvento(Number(codEvento)).then(evento => {
        this.evento = evento;
      });
    }
  }

  removerSala(sala: Sala) {
    let ind = this.listaSalas.indexOf(sala)
    this.listaSalas.splice(ind, 1);
  }

  salvar() {
    this.provider.SalvarEvento(this.evento);
    this.NavCtrl.back();
  }

  excluir() {
    this.provider.DeleteEvento(this.evento);
    this.NavCtrl.back()
  }

  async presentActionSheet() {

    this.provider.GetListaSalas().then((salas: any) => {      
      let opt = [];
      salas.forEach(s => {
        opt.push({
          text: `${s.nome} - ${s.descricao}`,
          value: 'md-albums',
          handler: () => {
            this.listaSalas.push(s)
            
          }
        })
      })

      this.pickerCtrl.create({
        buttons: [{
          text: 'Adicionar',
        }],
        columns: [
          {
            name: 'Salas',
            options: opt
          }
        ]
      }).then(result => {
        result.present();
      })


    }).catch(erro => {
      alert("Erro ao listar salas")
    })
  }
}

