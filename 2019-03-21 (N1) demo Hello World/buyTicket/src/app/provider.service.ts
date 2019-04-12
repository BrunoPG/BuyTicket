import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  C_SERVIDOR = 'SERV_CONFIG';
  C_PORTA = 'PORTA_CONFIG';
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



}
