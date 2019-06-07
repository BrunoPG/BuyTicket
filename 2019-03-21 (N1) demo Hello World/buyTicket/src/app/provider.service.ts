import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Sala, Setor, Evento } from '../../src/app/configuracao';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  C_SERVIDOR = 'SERV_CONFIG';
  C_PORTA = 'PORTA_CONFIG';


  listaSala = new Array<Sala>()
  listaEventos = new Array<Evento>()

  constructor(
    public storage: Storage,
    public HTTP: HttpClient
  ) {



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

  GetListaSalas() {

    return new Promise(resolve => {
      this.HTTP.get("http://10.13.2.210:3456/sala/all", {}).subscribe(result => {
        resolve(result);
      }, erro => {
        console.log(erro)
      });


    })

  }

  GetSetor(codsala, codSetor: Number): Promise<Setor> {
    return new Promise(
      (resolve) => {
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
      })
  }

  GetSetores(codsala: Number): Promise<Array<Setor>> {
    return new Promise(
      (resolve) => {        
        this.HTTP.get("http://10.13.2.210:3456/setor/sala/" + codsala, {}).subscribe((result: any) => {
          if (result.erro == null)
             resolve(result.setores)
          else
          console.log('Erro:', result.erro)    
        }, erro => {
          console.log('Erro:', erro.erro)
        });
      })
  }


  SalvarSala(sala: Sala): Promise<Sala>{
    return new Promise(
      (resolve) => {                
        this.HTTP.post("http://10.13.2.210:3456/sala/save", sala).subscribe((result: any) => {
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
    let i = this.listaSala.indexOf(s)
    this.listaSala.splice(i, 1)
  }

  GetSala(cod: number): Promise<Sala> {
    return new Promise(
      (resolve) => {
        this.HTTP.get("http://10.13.2.210:3456/sala/" + cod, {}).subscribe((result: any) => {
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
