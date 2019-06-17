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

  SERVIDOR: string
  PORTA: string;

  listaSala = new Array<Sala>()
  listaEventos = new Array<Evento>()

  constructor(
    public storage: Storage,
    public HTTP: HttpClient
  ) {

    this.GetServidor().then(serv => {
      this.SERVIDOR = serv;
    }).catch(() => {
      this.SERVIDOR = "";
    })

    this.GetPorta().then(p => {
      this.PORTA = p;
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

  GetChaveSetor(codSala: Number): Number {
    // this.listaSala.forEach(element => {
    //   if (element.id == codSala) {
    //     return element.setores.length + 1
    //   }
    // });
    return 0;
  }

  SetServidorPorta(servidor: String, porta: string) {
    this.storage.set(this.C_SERVIDOR, servidor);
    this.storage.set(this.C_PORTA, porta);
  }

  GetServidor(): Promise<string> {
    return this.storage.get(this.C_SERVIDOR).then((serv) => {
      return serv;
    });
  }

  GetPorta(): Promise<string> {
    return this.storage.get(this.C_PORTA).then((port) => {
      return port;
    });
  }

  GetListaSalas() {

    return new Promise(resolve => {
      this.HTTP.get("http://" + this.SERVIDOR + ":" + this.PORTA + "/sala/all", {}).subscribe(result => {
        resolve(result);
      }, erro => {
        console.log(erro)
      });


    })

  }

  GetSetor(setor: Number): Promise<Setor> {
    return new Promise(
      (resolve) => {
        this.HTTP.get("http://" + this.SERVIDOR + ":" + this.PORTA + "/setor/" + setor, {}).subscribe((result: any) => {
          resolve(result.setor)
        }, erro => {
          reject(erro.erro)
        });
      })
  }

  GetSetoresSala(codsala: Number): Promise<Array<Setor>> {
    return new Promise(
      (resolve) => {
        this.HTTP.get("http://" + this.SERVIDOR + ":" + this.PORTA + "/setor/sala/" + codsala, {}).subscribe((result: any) => {
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
        this.HTTP.post("http://" + this.SERVIDOR + ":" + this.PORTA + "/setor", setor).subscribe((result: any) => {
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
    this.HTTP.delete("http://" + this.SERVIDOR + ":" + this.PORTA + "/setor/" + id_setor).subscribe((result: any) => {
      console.log(result)
    }, erro => {
      console.log('Erro:', erro.erro)
    });
  }


  SalvarSala(sala: Sala): Promise<Sala> {
    return new Promise(
      (resolve) => {
        this.HTTP.post("http://" + this.SERVIDOR + ":" + this.PORTA + "/sala", sala).subscribe((result: any) => {
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
    this.HTTP.delete("http://" + this.SERVIDOR + ":" + this.PORTA + "/sala/" + s.id).subscribe((result: any) => {
      console.log(result)
    }, erro => {
      console.log('Erro:', erro.erro)
    });
  }

  GetSala(cod: number): Promise<Sala> {
    return new Promise(
      (resolve) => {
        this.HTTP.get("http://" + this.SERVIDOR + ":" + this.PORTA + "/sala/" + cod, {}).subscribe((result: any) => {
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
