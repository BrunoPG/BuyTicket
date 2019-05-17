import { Component, OnInit, Input } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { Sala, Setor, Acento } from '../configuracao';
import { ProviderService } from '../provider.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroSetorPage } from '../cadastro-setor/cadastro-setor.page';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-cadastro-sala',
  templateUrl: './cadastro-sala.page.html',
  styleUrls: ['./cadastro-sala.page.scss'],
})
export class CadastroSalaPage implements OnInit {

  @Input() value: number;

  acao = ""


  sala: Sala
  
  constructor(
    public navCtrl: NavController,
    public provider: ProviderService,
    private activatedRoute: ActivatedRoute,
    public modal: ModalController,
    public router: Router) {
    let id = this.activatedRoute.snapshot.paramMap.get('id')
    this.provider.GetSala(Number(id)).then(sala => {
      this.sala = sala
      if (this.sala.codigo == 0) {
        this.acao = "Criar sala"
      } else {
        this.acao = "Editando sala"
      }
    }).catch(() => {
      this.sala = new Sala()
    })

  }

  ngOnInit() {
  }

  salvar() {
    if (this.sala.codigo == 0)
      this.provider.AddSala(this.sala);
    this.navCtrl.back();
  }

  sair() {

  }

  excluir() {
    this.provider.ExcluirSala(this.sala)
    this.navCtrl.back();
  }

  async editarSetor(setor: Setor) {
    if (setor != null) {
      const modalCad = await this.modal.create({
        component: CadastroSetorPage,
        componentProps: { setor: setor.codigo, sala: this.sala.codigo }
      });
      modalCad.onDidDismiss().then((detail: OverlayEventDetail) => {
        if (detail.data.acao == 2) {
          let indx = this.sala.setores.indexOf(setor);
          this.sala.setores.splice(indx, 1)
        } else if (detail.data.acao == 1) {
          setor = detail.data.obj;
        }

      });
      await modalCad.present();
    }
  }


  async CriarSetor() {
    const modalCad = await this.modal.create({
      component: CadastroSetorPage,
      componentProps: { setor: 0, sala: this.sala.codigo }
    });
    modalCad.onDidDismiss().then((detail: OverlayEventDetail) => {

      if (detail.data.acao == 0) {
        let novoSetor: Setor
        novoSetor = detail.data.obj
        let newCod = this.provider.GetChaveSetor(this.sala.codigo)
        if (newCod == 0) {
          newCod = this.sala.setores.length + 1
        }
        novoSetor.codigo = newCod;
        this.sala.setores.push(novoSetor);
      }
    });

    await modalCad.present();
  }



}
