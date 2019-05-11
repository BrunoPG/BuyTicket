import { Component, OnInit, Input } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { Sala, Setor } from '../configuracao';
import { ProviderService } from '../provider.service';
import { ActivatedRoute } from '@angular/router';
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
  setores: Array<Setor>;
  constructor(
    public navCtrl: NavController,
    public provider: ProviderService,
    private activatedRoute: ActivatedRoute,
    public modal: ModalController) {
    let id = this.activatedRoute.snapshot.paramMap.get('id')
    this.provider.GetSala(Number(id)).then(sala => {
      this.sala = sala
    }).catch(SalaVazia => {
      this.sala = SalaVazia
    })
    if (id == '0') {
      this.acao = "Criar sala"
    } else {
      this.acao = "Editar sala"
    }
    this.setores = new Array<Setor>();

  }

  ngOnInit() {
  }

  salvar() {

  }

  sair() {

  }

  excluir() {

  }

  async editarSetor(setor: Setor) {
    if (setor != null) {
      let indx = this.setores.indexOf(setor);
      const modalCad = await this.modal.create({
        component: CadastroSetorPage,
        componentProps: { setor: setor }
      });
      modalCad.onDidDismiss().then((detail: OverlayEventDetail) => {
        if (detail.data == null) {
          this.setores.splice(indx, 1)
        }
      });
      await modalCad.present();
    }
  }


  async CriarSetor() {
    let newSetor: Setor;
    newSetor = new Setor();

    newSetor.codigo = 0;
    newSetor.descricao = '';
    newSetor.nome = '';
    newSetor.qtd_colunas = 0;
    newSetor.qtd_fileira = 0;

    const modalCad = await this.modal.create({
      component: CadastroSetorPage,
      componentProps: { setor: newSetor }
    });
    modalCad.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        newSetor = detail.data;
        this.setores.push(newSetor);
      }
    });
    await modalCad.present();
  }

}
