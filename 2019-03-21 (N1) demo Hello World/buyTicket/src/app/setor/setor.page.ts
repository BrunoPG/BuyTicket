import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CadastroSetorPage } from '../cadastro-setor/cadastro-setor.page';
@Component({
  selector: 'app-setor',
  templateUrl: './setor.page.html',
  styleUrls: ['./setor.page.scss'],
})
export class SetorPage implements OnInit {

  constructor(public modal: ModalController) { }

  ngOnInit() {
  }


  async editarSetor(codSetor: Number) {

    const modalCad = await this.modal.create({
      component: CadastroSetorPage,
      componentProps: { value: 10 }
    });
    modalCad.present();
  }

}
