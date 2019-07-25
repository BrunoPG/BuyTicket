import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Sala, Setor, Evento, Assento, Venda, Ingresso } from '../../src/app/configuracao';
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

  GetListaEventos(): Promise<Array<Evento>> {
    return new Promise((resolve) => {
      this.HTTP.get(`${this.GetRota()}/evento/all`, {}).subscribe((result: any) => {
        if (result.erro != null)
          reject(result.erro)
        else {
          if (result.eventos == []) {
            resolve(new Array<Evento>());
          } else
            resolve(result.eventos)
        }
      }, erro => {
        reject(erro.erro)
      });
    })
  }

  SalvarEvento(evento: Evento): Promise<Evento> {
    return new Promise(resolve => {
      if (evento.id == 0) {
        this.HTTP.post(`${this.GetRota()}/evento`, evento).subscribe((result: any) => {
          resolve(result.evento)
        }, erro => {
          reject(erro.erro)
        })
      } else {
        this.HTTP.put(`${this.GetRota()}/evento`, evento).subscribe((result: any) => {
          resolve(result.evento)
        }, erro => {
          reject(erro.erro)
        })
      }
    })

  }



  DeleteEvento(evento: Evento) {

  }

  GetSalaNaoEventos(evento: Evento): Array<Sala> {

    return new Array<Sala>();
  }


  GetEvento(cod: Number): Promise<Evento> {
    return new Promise((resolve) => {
      this.HTTP.get(`${this.GetRota()}/evento/${cod}`, {}).subscribe((result: any) => {
        if (result.erro != null)
          reject(result.erro)
        else {
          resolve(result.evento)
        }
      }, erro => {
        reject(erro.erro)
      });
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

  GetListaSalas(): Promise<Array<Sala>> {
    return new Promise(resolve => {
      this.HTTP.get(this.GetRota() + "/sala/all", {}).subscribe((result: any) => {
        resolve(result.salas);
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
        if (setor.id == 0) {
          this.HTTP.post(this.GetRota() + "/setor/save", setor).subscribe((result: any) => {
            if (result.setor != null)
              resolve(result.setor)
            else
              resolve(result.erro)
          }, erro => {
            resolve(erro.erro)
          });
        } else {
          this.HTTP.put(this.GetRota() + "/setor", setor).subscribe((result: any) => {
            if (result.setor != null)
              resolve(result.setor)
            else
              resolve(result.erro)
          }, erro => {
            reject(erro.erro)
          });
        }
      })
  }



  SalvarAssentosSetor(Assentos): Promise<Setor> {
    return new Promise(
      (resolve) => {
        this.HTTP.post(this.GetRota() + "/assentos/save", Assentos).subscribe((result: any) => {
          if (result.setor != null)
            resolve(result.setor)
          else
            resolve(result.erro)
        }, erro => {
          resolve(erro.erro)
        });
      })
  }

  GetAssentos(id_setor): Promise<Array<Array<Assento>>> {
    return new Promise(resolve => {
      this.HTTP.get(this.GetRota() + "/assentos/setor/" + id_setor, {}).subscribe((result: any) => {

        let ABC = "ABCDEFGHIJKLMNOPQSRTUWXYZ";
        let retorno = new Array<Array<Assento>>();
        result.assentos.forEach((assento: Assento) => {
          let i = ABC.indexOf(assento.coluna)

          if (retorno[i] == undefined) {
            retorno[i] = new Array<Assento>()
          }
          retorno[i].push(assento)
        });
        resolve(retorno);
      }, erro => {
        alert("Erro ao listar assentos")
        console.log("Erro ao listar assentos: ", erro)
      });
    })

  }

  DeletaAssentos(id_setor): Promise<any> {
    return new Promise(resolve => {
      if (id_setor == 0) {
        resolve("");
      }
      this.HTTP.delete(this.GetRota() + "/assentos/setor/" + id_setor, {}).subscribe((result: any) => {
        resolve(result);
      }, erro => {
        alert("Erro ao excluir assentos")
        console.log("Erro ao excluir assentos: ", erro)
      });
    })

  }

  ExcluirSetor(id_setor) {
    this.HTTP.delete(this.GetRota() + "/setor/" + id_setor).subscribe((result: any) => {
      console.log(result)
    }, erro => {
      console.log('Erro:', erro.erro)
    });
  }


  SalvarSala(sala: Sala): Promise<Sala> {
    return new Promise(
      (resolve) => {
        if (sala.id == 0) {
          this.HTTP.post(this.GetRota() + "/sala/save", sala).subscribe((result: any) => {
            if (result.sala != null)
              resolve(result.sala)
            else
              console.log('Erro:', result.erro)
          }, erro => {
            console.log('Erro:', erro.erro)
          });
        } else {
          this.HTTP.put(this.GetRota() + "/sala", sala).subscribe((result: any) => {
            if (result.sala != null)
              resolve(result.sala)
            else
              console.log('Erro:', result.erro)
          }, erro => {
            console.log('Erro:', erro.erro)
          });
        }
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

  SalvaIngresso(ingressos): Promise<any> {
    return new Promise(
      (resolve) => {
        this.HTTP.post(this.GetRota() + "/venda/save", ingressos).subscribe((result: any) => {
          console.log(result)
          if (result.venda != null)
            resolve(result.venda_id)
          else
            console.log('Erro:', result.erro)
        }, erro => {
          console.log('Erro:', erro.erro)
        });
      })
  }

  GetVenda(idVenda): Promise<any> {
    return new Promise(
      (resolve) => {
        this.HTTP.get(this.SERVIDOR + ":" + this.PORTA + "/venda/" + idVenda, {}).subscribe((result: any) => {
          if (result.erro == null)
            resolve(result.venda)
          else
            reject(result.erro)
        }, erro => {
          reject(erro.erro)
        });
      })
  }

  SalvarSalaEvento(idEvento, salas) {
    return new Promise(
      (resolve) => {
        this.HTTP.post(this.GetRota() + "/evento/sala/" + idEvento, salas).subscribe((result: any) => {
          if (result == null)
            console.log('Erro:', result.erro)
        }, erro => {
          console.log('Erro:', erro.erro)
        });
      })
  }



}
