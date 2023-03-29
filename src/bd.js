import { createPool } from "mysql2/promise";
import {DB_HOST, DB_PASSWORD, DB_PORT, DB_NAME, DB_USER} from "./config.js"


export const conn = createPool({
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME
})

// conn.getConnection((err, connection) => {
//     if (err) {
//       console.error('Error al conectar con la base de datos: ', err);
//       return;
//     }
//     console.log('Conexión exitosa a la base de datos');
//     connection.release();
//   });
  
  
  
  

