import { Component, OnInit, Input } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { Sala, Setor, Acento } from '../configuracao';
import { ProviderService } from '../provider.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroSetorPage } from '../cadastro-setor/cadastro-setor.page';
import { OverlayEventDetail } from '@ionic/core';
import { providerDef } from '@angular/core/src/view';

@Component({
  selector: 'app-cadastro-sala',
  templateUrl: './cadastro-sala.page.html',
  styleUrls: ['./cadastro-sala.page.scss'],
})
export class CadastroSalaPage implements OnInit {

  @Input() value: number;

  acao = ""


  sala: Sala
  setores: Array<Setor>
  constructor(
    public navCtrl: NavController,
    public provider: ProviderService,
    private activatedRoute: ActivatedRoute,
    public modal: ModalController,
    public router: Router) {
    let id: any;
    id = this.activatedRoute.snapshot.paramMap.get('id')
    this.sala = new Sala();
    this.setores = new Array<Setor>();
    if (id == 0) {      
      this.acao = "Criar sala"
      this.sala = new Sala()
    } else {
      
      this.provider.GetSala(Number(id)).then(sala => {
        console.log(sala)
        this.sala = sala;
        this.provider.GetSetores(this.sala.id).then((setores: any )=>{
          this.setores = setores
          console.log(setores)
        })
      }).catch(() => {
        this.sala = new Sala()
      });
      this.acao = "Editando sala"
    }


  }

  ngOnInit() {
  }

  salvar() {
    if (this.sala.id == 0)
      this.provider.SalvarSala(this.sala).then((sala: any)=>{
        alert("Sala salva com sucesso"+sala.nome);
      });
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
        componentProps: { setor: setor.id, sala: this.sala.id }
      });
      modalCad.onDidDismiss().then((detail: OverlayEventDetail) => {
        // if (detail.data.acao == 2) {
        //   let indx = this.sala.setores.indexOf(setor);
        //   this.sala.setores.splice(indx, 1)
        // } else if (detail.data.acao == 1) {
        //   setor = detail.data.obj;
        // }

      });
      await modalCad.present();
    }
  }


  async CriarSetor() {
    this.salvar();
    const modalCad = await this.modal.create({
      component: CadastroSetorPage,
      componentProps: { setor: 0, sala: this.sala.id }
    });
    modalCad.onDidDismiss().then((detail: OverlayEventDetail) => {

      // if (detail.data.acao == 0) {
      //   let novoSetor: Setor
      //   novoSetor = detail.data.obj
      //   let newCod = this.provider.GetChaveSetor(this.sala.id)
      //   if (newCod == 0) {
      //     //newCod = this.sala.setores.length + 1
      //   }
      //   novoSetor.id = newCod;
      //   //this.sala.setores.push(novoSetor);
      // }
    });

    await modalCad.present();
  }



}
