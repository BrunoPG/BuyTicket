export interface Configuracao {

    servidor: String;
    porta: number;
}

export class Sala {
    codigo: Number
    nome: String
    descricao: String
    capacidade: Number
}

export class Setor {
    codigo: Number
    codSala: Number
    nome: String
    descricao: String
    qtd_fileira: Number
    qtd_colunas: Number

}

export class Acento{
    j: Number
    i: Number
    tipo: Number
    
}


