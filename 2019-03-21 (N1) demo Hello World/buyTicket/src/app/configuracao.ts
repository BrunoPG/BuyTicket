
export interface Configuracao {

    servidor: String;
    porta: string;
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
    //Assentos: Array<Array<Assento>>;

    constructor() {
        this.id = 0
        this.nome = ''
        this.descricao = ''
        this.qtd_fileira = 0
        this.qtd_coluna = 0
        //this.Assentos = new Array<Array<Assento>>();
    }


}

export class Assento {
    coluna: string
    linha: number
    tipo_id: Number
    status_id: Number
    setor_id: Number
    constructor() {
        this.coluna = ""
        this.linha = 0
        this.tipo_id = 1
        this.setor_id = 0
    }
}


export class Evento {
    id: Number
    nome: String
    descricao: String
    data: Date
    hora: Date
    local: String
    qtd_ingresso: Number
    valor: number
    salas: Array<Sala>;

    constructor() {
        this.id = 0
        this.nome = ''
        this.descricao = ''
        this.data = new Date();
        this.hora = new Date();
        this.local = "";
        this.qtd_ingresso = 0;
        this.salas = Array<Sala>();
        this.valor = 0.0
    }
}

export class Venda {
    id: Number
    valor_total: Number
    ingressos: Assento
    nome_evento: String
    local_evento: String
    nome_sala: String
    nome_setor: String
    data_evento: Date

    constructor() {
        this.id = 0
        this.valor_total = 0
        this.ingressos = new Assento
        this.nome_evento = ""
        this.local_evento = ""
        this.nome_sala = ""
        this.nome_setor = ""
        this.data_evento = new Date()
    }
}

export class Ingresso {
    id: Number
    cadeira_id: Number
    evento_id: Number
    constructor() {
        this.id = 0
        this.cadeira_id = 0
        this.evento_id = 0
    }
}

