import Cliente from "./Modelo/Cliente.js"; //nunca se esqueça da extensão .js

const cliente = new Cliente("Rodeio", "18/10/2024", "Rua Beltrano, 123", "R$ 10,00");

cliente.incluir().then(() =>{
    console.log("Cliente incluído com sucesso!");
}).catch((erro) =>{
    console.log("Erro ao incluir o cliente: " +  erro);
});

cliente.consultar("Rodeio").then((listaClientes)=>{
    for (const cliente of listaClientes){
        console.log(cliente.toString());
    }
}).catch((erro) =>{
    console.log("Erro ao consultar os clientes: " + erro);
});

