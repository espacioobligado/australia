import express from 'express';
import { createServer } from 'http';
// import { createServer as createHTTPSServer } from 'https';
import next from 'next';
import { Server } from 'socket.io';
import pkg from 'pg';
const { Pool } = pkg;
import cookieParser from 'cookie-parser';
// import fs from 'fs'; // Importar el módulo fs para leer los archivos del certificado
import crearUsuario from './usuarios.mjs';
import cors from 'cors';

const corsOptions = {
  origin: true, // Permitir cualquier origen
  optionsSuccessStatus: 200 // Para algunos navegadores legacy (IE11, varios SmartTVs)
};

let conn;
console.log('dejar una conexion sola');
const connectionString = 'postgres://default:8nmJ5TIpqDfx@ep-icy-fire-a4jj44kk-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require';
conn = new Pool({
  connectionString: connectionString,
});

function connectToDatabase() {
  conn.connect((err, client, release) => {
    if (err) {
      console.error('Error connecting to database:', err.message);
    } else {
      console.log('Connected to database');
      release();
    }
  });
}

function reconnect() {
  connectToDatabase();
  setInterval(reconnect, 5 * 60 * 1000);
}

reconnect();

const dev = process.env.NODE_ENV !== 'production';
// const hostname = 'localhost';
const hostname = 'https://quienviene.vercel.app';
const port = 3000;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const expressApp = express();

  // Middlewares
  expressApp.use(cors(corsOptions));
  expressApp.use(cookieParser());

  expressApp.all('*', async (req, res) => {
    let cookie = req.cookies.usuario;
    await lastConnection(cookie, res);
    return handle(req, res);
  });

    // Lee los archivos del certificado SSL/TLS
    // const httpsOptions = {
    //   key: fs.readFileSync('/path/to/your/ssl.key'), // Reemplaza con la ruta a tu archivo .key
    //   cert: fs.readFileSync('/path/to/your/ssl.cert') // Reemplaza con la ruta a tu archivo .cert
    // };

    // const httpServer = createHTTPSServer(httpsOptions, expressApp);
    // const io = new Server(httpServer, {
    //   connectionStateRecovery: {},
    // });
    
  const httpServer = createServer(expressApp);
  const io = new Server(httpServer, {
    connectionStateRecovery: {},
  });

  let chat_id;
  io.on('connection', async (socket) => {
    console.log('conectado ');

    socket.on('create', function (room) {
      socket.join(room);
      console.log('room creado-------------------------------', room);
      socket.on('chat message', async (obj) => {
        if (room) {
          socket.to(room).emit('event', obj);
          console.log('obj', obj);
          const currentTime = new Date();
          const query = 'INSERT INTO public.mensajes(contenido, remitente, chat_id, timeenviado) VALUES ($1, $2, $3, $4)';
          const values = [obj.msg, obj.remitente, obj.chat_id, currentTime];
          await conn.query(query, values);
        }
      });
    });

    socket.on('usuariosEnChat', async (msg) => {
      const partes = msg.split(']');
      room = msg;
      const remitente = partes[0];
      const publicacionDeUsuario = partes[1];
      parseInt(remitente);
      parseInt(publicacionDeUsuario);
      const chatIdCreation = async () => {
        const currentDate = new Date();
        if (remitente && publicacionDeUsuario) {
          let query = 'SELECT * FROM chat WHERE remitente = $1 AND publicacionDeUsuario = $2';
          let values = [remitente, publicacionDeUsuario];
          let result = await conn.query(query, values);
          if (result.rows.length !== 0) {
            chat_id = result.rows[0].id;
            let updateQuery = 'UPDATE chat SET activo = $1 WHERE id = $2';
            let values3 = [true, chat_id];
            await conn.query(updateQuery, values3);
            socket.emit('chat_id', chat_id);
            console.log('chat_id1', chat_id);
          } else if (result.rows.length === 0) {
            let query = 'INSERT INTO chat (remitente, publicacionDeUsuario, activo,timecreated) VALUES ($1, $2, $3, $4)';
            values.push(true, currentDate);
            await conn.query(query, values);
            let query2 = 'SELECT * FROM chat WHERE remitente = $1 AND publicacionDeUsuario = $2';
            let values2 = [remitente, publicacionDeUsuario];
            let result2 = await conn.query(query2, values2);
            chat_id = result2.rows[0].id;
            socket.emit('chat_id', chat_id);
            console.log('chat_idddddddd', chat_id);
          }
        } else {
          console.log('El array ids no tiene una longitud de 2. No se ejecutará la consulta.');
        }
      };
      chatIdCreation();
    });

    socket.on('disconnect', async () => {
      const currentDate = new Date();
      console.log(socket.handshake.auth.username + socket.id + ' ==== diconnected on', currentDate);
      console.log('diconnected', chat_id);
      await updateChatStatus(false, chat_id);
      socket.removeAllListeners();
    });
  });

  async function updateChatStatus(estado, chat_id) {
    try {
      let updateQuery = 'UPDATE chat SET activo = $1 WHERE id = $2';
      let updateValues = [estado, chat_id];
      await conn.query(updateQuery, updateValues);
    } catch (error) {
      console.error('Error updating chat status:', error);
    }
  }

  httpServer.once('error', (err) => {
    console.error(err);
  });

  process.on('SIGINT', async () => {
    console.log('Received SIGINT. Shutting down gracefully...');
    await updateChatStatus(false, chat_id);
    process.exit(0);
  });

  process.on('exit', async () => {
    console.log('Server is shutting down...');
    await updateChatStatus(false, chat_id);
  });

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});

const lastConnection = async (cookie, res) => {
  const currentDate = new Date();
  if (!cookie) {
    try {
      let nuevoUsuario;
      let userExists = true;

      while (userExists) {
        const nuevoUsuari = await crearUsuario();
        nuevoUsuario = decodeURIComponent(nuevoUsuari);

        const userExistsQuery = 'SELECT COUNT(*) FROM usuarios WHERE nombre = $1';
        const userExistsResult = await conn.query(userExistsQuery, [nuevoUsuario]);
        userExists = userExistsResult.rows[0].count !== '0';

        if (!userExists) {
          const insertQuery = 'INSERT INTO usuarios (nombre, lastConnection, timeCreated) VALUES ($1, $2, $3)';
          const insertValues = [nuevoUsuario, currentDate, currentDate];
          await conn.query(insertQuery, insertValues);
          console.log(` !cookie Usuario agregado: ${nuevoUsuario}`);

          const expiryDate = new Date();
          expiryDate.setFullYear(expiryDate.getFullYear() + 10);
          res.setHeader('Set-Cookie', `usuario=${nuevoUsuario}; Path=/; Expires=${expiryDate.toUTCString()}; Secure`);
          console.log('Cookie establecida para el nuevo usuario:', nuevoUsuario);
        } else {
          console.log(`El usuario ${nuevoUsuario} ya existe en la base de datos.`);
        }
      }
    } catch (error) {
      console.error('Error al asignar cookie:', error);
    }
  } else {
    try {
      const userQuery = 'SELECT id FROM usuarios WHERE nombre = $1';
      const userResult = await conn.query(userQuery, [cookie]);
      if (userResult.rows.length === 0) {
        const insertQuery = 'INSERT INTO usuarios (nombre, lastConnection, timeCreated) VALUES ($1, $2, $3)';
        const insertValues = [cookie, currentDate, currentDate];
        await conn.query(insertQuery, insertValues);
        console.log(` userResult.rows.length Usuario agregado: ${cookie}`);
      } else {
        const updateQuery = 'UPDATE usuarios SET lastConnection = $1 WHERE nombre = $2';
        const updateValues = [currentDate, cookie];
        await conn.query(updateQuery, updateValues);
        console.log('Última conexión actualizada para:', cookie);
      }
    } catch (error) {
      console.error('Error al asignar last connection:', error);
    }
  }
};