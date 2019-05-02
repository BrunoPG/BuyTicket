import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CadastroSalaPage } from './cadastro-sala.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroSalaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CadastroSalaPage]
})
export class CadastroSalaPageModule {}
