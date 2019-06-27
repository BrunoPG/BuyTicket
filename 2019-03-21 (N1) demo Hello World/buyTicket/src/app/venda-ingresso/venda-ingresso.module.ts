import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { VendaIngressoPage } from './venda-ingresso.page';
import { BuyAssentoModule } from '../buy-assento/buy-assento.module';

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
    RouterModule.forChild(routes),
    BuyAssentoModule
  ],
  declarations: [VendaIngressoPage]
})
export class VendaIngressoPageModule { }
