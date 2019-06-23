import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VendaPrecoPage } from './venda-preco.page';

const routes: Routes = [
  {
    path: '',
    component: VendaPrecoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VendaPrecoPage]
})
export class VendaPrecoPageModule {}
