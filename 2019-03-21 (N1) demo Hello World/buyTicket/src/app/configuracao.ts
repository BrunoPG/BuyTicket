import { Time } from '@angular/common';
import { StaticClassSansProvider } from '@angular/core/src/di/provider';

const acao = ['add', 'update', 'delete', 'none']

export interface Configuracao {

    servidor: String;
    porta: number;
}

export class Sala {
    id: Number
    nome: String
    descricao: String
    capacidade: Number
    //setores: Array<Setor>;

    constructor() {

        this.id = 0
        this.nome = ""
        this.descricao = ""
        //this.setores = new Array<Setor>();
    }
}

export class Setor {
    id: Number
    nome: String
    descricao: String
    qtd_fileira: Number
    qtd_coluna: Number
    sala_id: Number
    //acentos: Array<Array<Acento>>;

    constructor() {
        this.id = 0
        this.nome = ''
        this.descricao = ''
        this.qtd_fileira = 0
        this.qtd_coluna = 0
        //this.acentos = new Array<Array<Acento>>();
    }


}

export class Acento {
    j: Number
    i: Number
    tipo: Number
    ativo: boolean
}


export class Evento {
    cod: Number
    nome: String
    descricao: String
    data: Date
    hora: Date
    local: String
    qtd_ingresos: Number   
    salas: Array<Sala> 

    constructor() {
        this.cod = 0
        this.nome = ''
        this.descricao = ''
        this.data = new Date();
        this.hora = new Date();
        this.local = "";
        this.qtd_ingresos = 0;
        this.salas = new Array<Sala>();
    }
}

