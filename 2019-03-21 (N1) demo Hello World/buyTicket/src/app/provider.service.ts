import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Sala, Setor, Evento } from '../../src/app/configuracao';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  C_SERVIDOR = 'SERV_CONFIG';
  C_PORTA = 'PORTA_CONFIG';


  listaSala = new Array<Sala>()
  listaEventos= new Array<Evento>()

  constructor(
    public storage: Storage,
    public HTTP: Http
  ) {



  }


  GetListaEventos(): Array<Evento> {
    return this.listaEventos; 
  }


  GetChaveSetor(codSala: Number): Number {
    this.listaSala.forEach(element => {
      if (element.codigo == codSala) {
        return element.setores.length + 1
      }
    });
    return 0;
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
    this.HTTP.get('https://viacep.com.br/ws/CE/Maracanau/rua/json/', {} ).subscribe(result =>{
      console.log(result.json())
    })   

    return this.listaSala;

  }

  GetSetor(codsala, codSetor: Number): Promise<Setor> {
    return new Promise(
      (resolve) => {
        this.listaSala.forEach(s => {
          if (s.codigo == codsala) {
            s.setores.forEach(st => {
              if (st.codigo == codSetor) {
                resolve(st)
              }
            })
          }
        });
        resolve(new Setor())
      })
  }

  AddSala(sala: Sala) {
    sala.codigo = this.listaSala.length + 1;
    this.listaSala.push(sala)
  }

  ExcluirSala(s: Sala) {
    let i = this.listaSala.indexOf(s)
    this.listaSala.splice(i, 1)
  }

  GetSala(cod: number): Promise<Sala> {
    return new Promise(
      (resolve) => {
        this.listaSala.forEach(s => {
          if (s.codigo == cod) {
            resolve(s);
          }
        });
        resolve(new Sala())
      })
  }



}
