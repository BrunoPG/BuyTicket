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
    this.setores = new Array<Setor>();
    this.sala = new Sala();

  }

  ngOnInit() {

    let id: any;
    id = this.activatedRoute.snapshot.paramMap.get('id')
    // this.sala = new Sala();
    // this.setores = new Array<Setor>();
    if (id == 0) {
      this.acao = "Criar sala"
      this.sala = new Sala();
    } else {

      this.provider.GetSala(Number(id)).then(sala => {
        this.sala = sala;
        this.provider.GetSetoresSala(this.sala.id).then((setores: any) => {
          this.setores = setores
        }).catch(erro => {
          alert("Erro abrir setores: " + erro)
        })
      }).catch((erro) => {
        alert("Erro abrir sala: " + erro)
        this.sala = new Sala()
      });
      this.acao = "Editando sala"
    }
    
  }

  salvar() {
    if (this.sala.id == 0)
      this.provider.SalvarSala(this.sala).then((sala: any) => {
        alert("Sala " + sala.nome + " salva com sucesso");
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
      await modalCad.present();
    }
  }


  async CriarSetor() {
    if (this.sala.id == 0) {
      this.provider.SalvarSala(this.sala).then(async (sala: any) => {
        alert("Sala " + sala.nome + " salva com sucesso!");
        this.sala.id = sala.id;

        const modalCad = await this.modal.create({
          component: CadastroSetorPage,
          componentProps: { setor: 0, sala: this.sala.id }
        });        
        await modalCad.present();
      });
    } else {
      const modalCad = await this.modal.create({
        component: CadastroSetorPage,
        componentProps: { setor: 0, sala: this.sala.id }
      });      
      await modalCad.present();
    }

  }


  ionViewDidEnter() {
    let id: any;
    id = this.activatedRoute.snapshot.paramMap.get('id')
    // this.sala = new Sala();
    // this.setores = new Array<Setor>();
    if (id == 0) {
      this.acao = "Criar sala"
      this.sala = new Sala();
    } else {

      this.provider.GetSala(Number(id)).then(sala => {
        this.sala = sala;
        this.provider.GetSetoresSala(this.sala.id).then((setores: any) => {
          this.setores = setores
        }).catch(erro => {
          alert("Erro abrir setores: " + erro)
        })
      }).catch((erro) => {
        alert("Erro abrir sala: " + erro)
        this.sala = new Sala()
      });
      this.acao = "Editando sala"
    }
  }


}
