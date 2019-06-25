import { Component, OnInit, Input } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { Sala, Setor } from '../configuracao';
import { ProviderService } from '../provider.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroSetorPage } from '../cadastro-setor/cadastro-setor.page';

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
    this.provider.SalvarSala(this.sala).then((sala: any) => {
      alert("Sala " + sala.nome + " salva com sucesso!");
    })
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
      this.router.navigateByUrl("/cadastro-setor/" + setor.id, { state: this.sala })
      // const modalCad = await this.modal.create({
      //   component: CadastroSetorPage,
      //   componentProps: { setor: setor.id, sala: this.sala.id }
      // });
      // await this.modal.dismiss((setor) => {
      //   console.log("aqui também")
      //   window.location.reload();
      //   this.provider.GetSetoresSala(this.sala.id).then((setores: any) => {
      //     this.setores = setores
      //   }).catch(erro => {
      //     alert("Erro abrir setores: " + erro)
      //   })
      // })

      // await modalCad.present();




    }
  }


  async CriarSetor() {
    this.provider.SalvarSala(this.sala).then(async (sala: any) => {
      ////alert("Sala " + sala.nome + " salva com sucesso!");
      // this.sala.id = sala.id;
      this.router.navigate(["cadastro-setor/0", sala])
    });
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
