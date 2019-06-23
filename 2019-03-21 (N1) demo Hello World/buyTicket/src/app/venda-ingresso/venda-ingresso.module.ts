import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VendaIngressoPage } from './venda-ingresso.page';

const routes: Routes = [
  {
    path: '',
    component: VendaIngressoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VendaIngressoPage]
})
export class VendaIngressoPageModule {}
