import express from 'express';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { join } from 'path';

const app = express();
app.use(cors());

var usersConectados = [];

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
});

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    socket.on('Nuevo usuario', (nuevoUsuario) => {
        console.log('Usuario conectado');
        console.log(socket.id);

        try {
            usersConectados.push({ id: socket.id, username: nuevoUsuario });
            socket.broadcast.emit('usuarioConectado', usersConectados);

            for (let i = 0; i < usersConectados.length; i++) {
                console.log("Hola", usersConectados[i]);
            }

            socket.on('disconnecting', () => {
                // Manejar la desconexión cuando se emite el evento 'disconnecting'
                const usuarioDesconectado = usersConectados.find(user => user.id === socket.id);

                if (usuarioDesconectado) {
                    console.log(`Usuario desconectado: ${usuarioDesconectado.username}`);
                    const usuarioConectadoIndex = usersConectados.findIndex(user => user.id === socket.id);
                    
                    if (usuarioConectadoIndex !== -1) {
                        usersConectados.splice(usuarioConectadoIndex, 1);
                        io.emit('arrayUsers', usersConectados);
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }
    });

    // Mueve el manejo del evento de desconexión aquí, fuera del callback de conexión
    socket.on('disconnect', () => {
        const usuarioConectadoIndex = usersConectados.findIndex(user => user.id === socket.id);

        if (usuarioConectadoIndex !== -1) {
            usersConectados.splice(usuarioConectadoIndex, 1);
            io.emit('arrayUsers', usersConectados);
        }
    });
});

server.listen(3000, () => {
    console.log('Servidor en ejecución en http://localhost:3000');
});
