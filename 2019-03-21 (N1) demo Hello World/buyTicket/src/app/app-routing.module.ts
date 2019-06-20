import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'list', loadChildren: './list/list.module#ListPageModule'  },
  { path: 'evento', loadChildren: './evento/evento.module#EventoPageModule' },
  { path: 'sala', loadChildren: './sala/sala.module#SalaPageModule' },
  { path: 'setor', loadChildren: './setor/setor.module#SetorPageModule' },
  { path: 'configuracoes', loadChildren: './configuracoes/configuracoes.module#ConfiguracoesPageModule' },
  { path: 'cadastro-setor', loadChildren: './cadastro-setor/cadastro-setor.module#CadastroSetorPageModule' },
  { path: 'cadastro-sala/:id', loadChildren: './cadastro-sala/cadastro-sala.module#CadastroSalaPageModule' },
  { path: 'cadastro-evento', loadChildren: './cadastro-evento/cadastro-evento.module#CadastroEventoPageModule' },
  { path: 'slides', loadChildren: './slides/slides.module#SlidesPageModule' }
 
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
