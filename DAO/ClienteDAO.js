import conectar from "./Conexao.js";
import Cliente from "../Modelo/Cliente.js";
export default class ClienteDAO{
  

    constructor(){
        this.init(); 
    }

    async init(){
        try {
            const conexao = await conectar();
            const sql = `CREATE TABLE IF NOT EXISTS cliente (
                     evento VARCHAR(14) NOT NULL PRIMARY KEY, 
                     data VARCHAR(80) NOT NULL, 
                     endereco VARCHAR(200) NOT NULL, 
                     valor VARCHAR(10) NOT NULL, 
                    `;
            await conexao.execute(sql);
            await global.poolConexoes.releaseConnection(conexao);
            console.log("Banco de dados iniciado com sucesso!");
        } catch (erro) {
            console.log("O banco de dados não pode ser iniciado!");
        }
    }

    async gravar(cliente){
        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = `INSERT INTO cliente(evento,data,endereco,valor) 
                         VALUES (?, ?, ?, ?);`;
            const parametros = [
                cliente.evento,
                cliente.data,
                cliente.endereco,
                cliente.valores,
    
            ];
            await conexao.execute(sql,parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
    }

    async alterar(cliente){
        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = `UPDATE cliente SET data = ?, 
                         endereco = ?, 
                         valor = ?, 
                         WHERE evento = ?;`
            const parametros = [
                cliente.evento,
                cliente.data,
                cliente.endereco,
                cliente.valoracion,
            ];
            await conexao.execute(sql,parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(cliente){
        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = `DELETE FROM cliente WHERE evento = ?;`;
            const parametros = [
                cliente.evento
            ];
            await conexao.execute(sql,parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termoBusca){
        let sql = "";
        let parametros = [];
        if (termoBusca){
            sql = `SELECT * FROM cliente WHERE evento= ? order by nome;`;
            parametros.push(termoBusca);
        }
        else{
            sql = `SELECT * FROM cliente order by evento;`;
        }

        const conexao = await conectar();
        const [registros] = await conexao.execute(sql,parametros);
        let listaClientes = [];
        for (const registro of registros){
            const cliente = new Cliente(
                registro.evento,
                registro.data,
                registro.endereco,
                registro.valor,

            );
            listaClientes.push(cliente);
        }
        await global.poolConexoes.releaseConnection(conexao);
        return listaClientes;

    }
}