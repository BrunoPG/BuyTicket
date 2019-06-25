import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CadastroSetorPage } from './cadastro-setor.page';
import { BuyAssentoComponent } from '../buy-assento/buy-assento.component';

const routes: Routes = [
  {
    path: '',
    component: CadastroSetorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CadastroSetorPage,BuyAssentoComponent]
})
export class CadastroSetorPageModule {}
