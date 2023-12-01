import express from 'express';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';


const app = express();
//Permetem que el servidor pugui rebre peticions de qualsevol origen
app.use(cors());

var usersConectados = [];

//Creem el servidor de Socket.io especificant que pot accedir qualsevol client
const server = createServer(app);
const io = new Server(server,{
  cors: {
    origin: '*', // Replace with the actual origin of your client application
    methods: ['GET', 'POST'],
  }
});


app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    socket.on('Nuevo usuario', (nuevoUsuario) => {
        console.log('usuario conectado');
        console.log(socket.id);

        try {
            
            usersConectados.push({nuevoUsuario });
            
            socket.broadcast.emit('usuarioConectado', usersConectados);
            for (let i = 0; i < usersConectados.length; i++) {
                console.log("hola",usersConectados[i]);
            }

            socket.on('disconnect', () => {
                const usuarioConectadoIndex = usersConectados.findIndex(user=> user.username === socket.id);

                if (usuarioConectadoIndex) {
                    usersConectados.splice(usersConectados.indexOf(usuarioConectadoIndex), 1);

                    io.emit('arrayUsers', usersConectados);
                }
            });

        } catch (error) {
            console.log(error);
        }
    });
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});