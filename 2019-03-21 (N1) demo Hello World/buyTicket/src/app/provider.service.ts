import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Sala, Setor, Evento } from '../../src/app/configuracao';
import { HttpClient } from '@angular/common/http';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  C_SERVIDOR = 'SERV_CONFIG';
  C_PORTA = 'PORTA_CONFIG';


  SERVIDOR: string = ""
  PORTA: string = ""

  listaSala = new Array<Sala>()
  listaEventos = new Array<Evento>()

  constructor(
    public storage: Storage,
    public HTTP: HttpClient
  ) {
    this.GetServidor().then(serv => {
      this.SERVIDOR = serv;
      this.GetPorta().then(p => {
        this.PORTA = p;
      })
    }).catch(() => {
      this.SERVIDOR = "";
    })
  }

  GetListaEventos(): Array<Evento> {
    return this.listaEventos;
  }

  Addevento(evento: Evento) {
    if (evento.cod == 0) {
      evento.cod = this.listaEventos.length + 1;
    }
    this.listaEventos.push(evento);
  }

  DeleteEvento(evento: Evento) {

  }

  GetSalaNaoEventos(evento: Evento): Array<Sala> {
    let salas = new Array<Sala>();

    this.listaSala.forEach(sala => {
      if (evento.salas.indexOf(sala) < 0)
        salas.push(sala)

    });
    return salas
  }


  GetEvento(cod: Number): Promise<Evento> {

    return new Promise((resolve) => {
      this.listaEventos.forEach(evento => {
        if (evento.cod == cod) {
          resolve(evento)
        }
      });
      resolve(new Evento)
    })

  }

  GetRota(): String {
    if (this.PORTA != "" && typeof (this.PORTA) != undefined)
      return this.SERVIDOR + ":" + this.PORTA
    else {
      return (this.SERVIDOR)
    }
  }

  GetChaveSetor(codSala: Number): Number {

    return 0;
  }

  SetServidorPorta(servidor: String, porta: string) {
    this.SERVIDOR = servidor + ""
    this.PORTA = porta
    this.storage.set(this.C_SERVIDOR, servidor);
    this.storage.set(this.C_PORTA, porta + "");
  }

  GetServidor(): Promise<string> {
    return new Promise(resolve => {
      this.storage.get(this.C_SERVIDOR).then((serv) => {
        if (typeof (serv) == undefined || serv === "") {
          resolve("")
        } else
          resolve(serv);
      })
    })
  }


  GetPorta(): Promise<string> {
    return new Promise(resolve => {
      this.storage.get(this.C_PORTA).then((port) => {
        if (typeof (port) == undefined || port === "") {
          resolve("")
        } else
          resolve(port)
      })
    });
  }

  GetListaSalas() {
    return new Promise(resolve => {
      this.HTTP.get(this.GetRota() + "/sala/all", {}).subscribe(result => {
        resolve(result);
      }, erro => {
        alert("Erro ao listar salas")
        console.log("Erro ao listar salas: ", erro)
      });
    })

  }

  GetSetor(setor: Number): Promise<Setor> {
    return new Promise(
      (resolve) => {
        this.HTTP.get(this.GetRota() + "/setor/" + setor, {}).subscribe((result: any) => {
          resolve(result.setor)
        }, erro => {
          reject(erro.erro)
        });
      })
  }

  GetSetoresSala(codsala: Number): Promise<Array<Setor>> {
    return new Promise(
      (resolve) => {
        this.HTTP.get(this.SERVIDOR + ":" + this.PORTA + "/setor/sala/" + codsala, {}).subscribe((result: any) => {
          if (result.erro != null)
            reject(result.erro)
          else {
            if (result.setores == []) {
              resolve(new Array<Setor>());
            } else
              resolve(result.setores)
          }
        }, erro => {
          reject(erro.erro)
        });
      })
  }

  SalvarSetor(setor): Promise<Setor> {
    return new Promise(
      (resolve) => {
        console.log(setor)
        this.HTTP.post(this.GetRota() + "/setor/save", setor).subscribe((result: any) => {
          if (result.setor != null)
            resolve(result.setor)
          else
            resolve(result.erro)
        }, erro => {
          resolve(erro.erro)
        });
      })
  }


  EditarSetor(setor): Promise<Setor> {
    return new Promise(
      (resolve) => {
        this.HTTP.put("http://" + this.SERVIDOR + ":" + this.PORTA + "/setor", setor).subscribe((result: any) => {
          if (result.setor != null)
            resolve(result.setor)
          else
            resolve(result.erro)
        }, erro => {
          reject(erro.erro)
        });
      })
  }


  ExcluirSetor(id_setor) {
    this.HTTP.delete(this.SERVIDOR + ":" + this.PORTA + "/setor/" + id_setor).subscribe((result: any) => {
      console.log(result)
    }, erro => {
      console.log('Erro:', erro.erro)
    });
  }


  SalvarSala(sala: Sala): Promise<Sala> {
    return new Promise(
      (resolve) => {
        this.HTTP.post(this.SERVIDOR + ":" + this.PORTA + "/sala", sala).subscribe((result: any) => {
          if (result.sala != null)
            resolve(result.sala)
          else
            console.log('Erro:', result.erro)
        }, erro => {
          console.log('Erro:', erro.erro)
        });
      })
  }

  ExcluirSala(s: Sala) {
    this.HTTP.delete(this.SERVIDOR + ":" + this.PORTA + "/sala/" + s.id).subscribe((result: any) => {
      console.log(result)
    }, erro => {
      console.log('Erro:', erro.erro)
    });
  }

  GetSala(cod: number): Promise<Sala> {
    return new Promise(
      (resolve) => {
        this.HTTP.get(this.SERVIDOR + ":" + this.PORTA + "/sala/" + cod, {}).subscribe((result: any) => {
          if (result.erro == null)
            resolve(result.sala)
          else
            reject(result.erro)
        }, erro => {
          reject(erro.erro)
        });
      })
  }



}
