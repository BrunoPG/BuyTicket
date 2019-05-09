import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Sala } from '../../src/app/configuracao';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  C_SERVIDOR = 'SERV_CONFIG';
  C_PORTA = 'PORTA_CONFIG';


  s: Sala = {
    codigo: 10,
    descricao: "sala maior",
    nome: "sala 10",
    capacidade: 20
  }
  s2: Sala = {
    codigo: 15,
    descricao: "sala menor",
    nome: "sala 15",
    capacidade: 5
  }

  listaSala = new Array<Sala>()

  constructor(
    public storage: Storage
  ) {



  }

  SetServidorPorta(servidor: String, porta: number) {
    this.storage.set(this.C_SERVIDOR, servidor);
    this.storage.set(this.C_PORTA, porta);
  }

  GetServidor(): Promise<string> {
    return this.storage.get(this.C_SERVIDOR).then((serv) => {
      return serv;
    });
  }

  GetPorta(): Promise<number> {
    return this.storage.get(this.C_PORTA).then((port) => {
      return port;
    });
  }

  GetListaSalas(): Array<Sala> {
    this.listaSala = new Array<Sala>();
    this.listaSala.push(this.s)
    this.listaSala.push(this.s2)

    return this.listaSala;
  }

  GetSala(cod: number): Promise<Sala> {
    return new Promise(
      (resolve, reject) => {
        this.listaSala.forEach(s => {
          if (s.codigo = cod) {
            resolve(s);
          }
        });
        reject({
          codigo: 0,
          descricao: "",
          nome: "",
          capacidade: 0
        })
      })



  }



}
