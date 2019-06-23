import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Sala, Setor, Evento } from '../../src/app/configuracao';
import { HttpClient } from '@angular/common/http';
<<<<<<< Updated upstream

=======
import { reject } from 'q';
>>>>>>> Stashed changes
@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  C_SERVIDOR = 'SERV_CONFIG';
  C_PORTA = 'PORTA_CONFIG';

<<<<<<< Updated upstream
=======
  SERVIDOR: string = ""
  PORTA: string = ""
>>>>>>> Stashed changes

  listaSala = new Array<Sala>()
  listaEventos = new Array<Evento>()

  constructor(
    public storage: Storage,
    public HTTP: HttpClient
  ) {

<<<<<<< Updated upstream


=======
    this.GetServidor().then(serv => {
      this.SERVIDOR = serv;
      this.GetPorta().then(p => {
        this.PORTA = p;
      })
    }).catch(() => {
      this.SERVIDOR = "";
    })

>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
  SetServidorPorta(servidor: String, porta: number) {
=======
  SetServidorPorta(servidor: String, porta: string) {
    this.SERVIDOR = servidor + ""
    this.PORTA = porta

>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
  GetPorta(): Promise<number> {
    return this.storage.get(this.C_PORTA).then((port) => {
      return port;
=======
  GetPorta(): Promise<string> {
    return new Promise(resolve => {
      this.storage.get(this.C_PORTA).then((port) => {
        if (typeof (port) == undefined || port === "") {
          resolve("")
        } else
          resolve(port)
      })
>>>>>>> Stashed changes
    });
  }

  GetListaSalas() {
    return new Promise(resolve => {
<<<<<<< Updated upstream
      this.HTTP.get("http://10.13.2.210:3456/sala/all", {}).subscribe(result => {
=======
      this.HTTP.get(this.GetRota() + "/sala/all", {}).subscribe(result => {
>>>>>>> Stashed changes
        resolve(result);
      }, erro => {
        alert("Erro ao listar salas")
        console.log("Erro ao listar salas: ", erro)
      });
    })

  }

  GetSetor(codsala, codSetor: Number): Promise<Setor> {
    return new Promise(
      (resolve) => {
<<<<<<< Updated upstream
        // this.listaSala.forEach(s => {
        //   if (s.id == codsala) {
        //     s.setores.forEach(st => {
        //       if (st.codigo == codSetor) {
        //         resolve(st)
        //       }
        //     })
        //   }
        // });
        resolve(new Setor())
=======
        this.HTTP.get(this.GetRota() + "/setor/" + setor, {}).subscribe((result: any) => {
          resolve(result.setor)
        }, erro => {
          reject(erro.erro)
        });
>>>>>>> Stashed changes
      })
  }

  GetSetores(codsala: Number): Promise<Array<Setor>> {
    return new Promise(
<<<<<<< Updated upstream
      (resolve) => {        
        this.HTTP.get("http://10.13.2.210:3456/setor/sala/" + codsala, {}).subscribe((result: any) => {
          if (result.erro == null)
             resolve(result.setores)
=======
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
        this.HTTP.put(this.SERVIDOR + ":" + this.PORTA + "/setor", setor).subscribe((result: any) => {
          if (result.setor != null)
            resolve(result.setor)
>>>>>>> Stashed changes
          else
          console.log('Erro:', result.erro)    
        }, erro => {
          console.log('Erro:', erro.erro)
        });
      })
  }

<<<<<<< Updated upstream
=======
  ExcluirSetor(id_setor) {
    this.HTTP.delete(this.SERVIDOR + ":" + this.PORTA + "/setor/" + id_setor).subscribe((result: any) => {
      console.log(result)
    }, erro => {
      console.log('Erro:', erro.erro)
    });
  }
>>>>>>> Stashed changes

  SalvarSala(sala: Sala): Promise<Sala>{
    return new Promise(
<<<<<<< Updated upstream
      (resolve) => {                
        this.HTTP.post("http://10.13.2.210:3456/sala/save", sala).subscribe((result: any) => {
=======
      (resolve) => {
        this.HTTP.post(this.SERVIDOR + ":" + this.PORTA + "/sala", sala).subscribe((result: any) => {
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    let i = this.listaSala.indexOf(s)
    this.listaSala.splice(i, 1)
=======
    this.HTTP.delete(this.SERVIDOR + ":" + this.PORTA + "/sala/" + s.id).subscribe((result: any) => {
      console.log(result)
    }, erro => {
      console.log('Erro:', erro.erro)
    });
>>>>>>> Stashed changes
  }

  GetSala(cod: number): Promise<Sala> {
    return new Promise(
      (resolve) => {
<<<<<<< Updated upstream
        this.HTTP.get("http://10.13.2.210:3456/sala/" + cod, {}).subscribe((result: any) => {
=======
        this.HTTP.get(this.SERVIDOR + ":" + this.PORTA + "/sala/" + cod, {}).subscribe((result: any) => {
>>>>>>> Stashed changes
          if (result.erro == null)
             resolve(result.sala)
          else
          console.log('Erro:', result.erro)    
        }, erro => {
          console.log('Erro:', erro.erro)
        });
      })
  }



}
