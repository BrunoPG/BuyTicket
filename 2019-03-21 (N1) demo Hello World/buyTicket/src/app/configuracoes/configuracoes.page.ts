import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Configuracao } from '../../app/configuracao';
import { ProviderService } from '../provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.page.html',
  styleUrls: ['./configuracoes.page.scss'],
})
export class ConfiguracoesPage implements OnInit {

  config: Configuracao = { servidor: '', porta: 0 };
  submitted = false;
  constructor(
    public provider: ProviderService,
    public rota: Router
  ) {

    this.provider.GetServidor().then(value => {
      this.config.servidor = value;
    });
    this.provider.GetPorta().then(value => {
      this.config.porta = value
    });
  }

  ngOnInit() {
  }

  SetarConfiguracao(form: NgForm) {
    this.submitted = true;
    this.provider.SetServidorPorta(this.config.servidor, this.config.porta);
    this.rota.navigateByUrl('/home');

  }


}
