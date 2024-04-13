import { Pool } from "pg";

let conn;

if (!conn) {
  conn = new Pool({
    connectionString: 'postgres://default:8nmJ5TIpqDfx@ep-icy-fire-a4jj44kk-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require',
  /*conn = new Pool({
    user: 'postgres',
    password: '1667',  
    host: '127.0.0.1',  
    port: 5439, 
    database: 'quienviene',*/
  });

  conn.connect(err => {
    if (err) {
      console.error('Error al conectar con la base de datos:', err.stack);
    } else {
      console.log('Conexión exitosa a la base de datos.');
    }
  });
} else {
  console.log('La conexión ya está establecida.');
}


export default conn ;