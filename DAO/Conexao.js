
import mysql from 'mysql2/promise';
export default async function conectar(){

    if (global.poolConexoes){
        return await global.poolConexoes.getConnection();
    }
    else{
        const pool = mysql.createPool({
            host: 'localhost',
            user: 'root', 
            port: 3306,
            password: '',
            database: 'backendappweb',
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10, 
            idleTimeout: 60000, 
            enableKeepAlive: true,
            keepAliveInitialDelay: 0,
          });

          global.poolConexoes = pool;

          return await global.poolConexoes.getConnection();
    }
}