import ClienteDAO from "../DAO/ClienteDAO.js";

export default class Cliente{
    
    #evento
    #data
    #endereco
    #valor
    

    constructor(evento, data, endereco,valor){
        this.#evento = evento;
        this.#data = data;
        this.#endereco = endereco;
        this.#valor = valor;
       
    }

    

    get evento(){
        return this.#evento;
    }

    set evento(novoEvento){
        this.#evento = novoEvento;
    }

    get data(){
        return this.#data;
    }

    set data(novoData){
        this.#data = novoData;
    }

    get endereco(){
        return this.#endereco;
    }

    set endereco(novoEndereco){
        this.#endereco = novoEndereco;
    }


    get valor(){
        return this.#valor;
    }

    set valor(novoValor){
        this.#valor= novoValor;
    }

    
    toString(){
      
        return `evento: ${this.#evento}
        data: ${this.#data}
        Endereço: ${this.#endereco}
        valor: ${this.#valor}
        `
    }

    async incluir(){
        const cliDAO = new ClienteDAO();
        await cliDAO.gravar(this);
    }

    async alterar(){
        const cliDAO = new ClienteDAO();
        await cliDAO.alterar(this);
    }

    async excluir(){
        const cliDAO = new ClienteDAO();
        await cliDAO.excluir(this);
    }

    async consultar(termoBusca){
        const cliDAO = new ClienteDAO();
        return await cliDAO.consultar(termoBusca);
    }
}