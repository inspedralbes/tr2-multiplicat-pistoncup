import express from 'express';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { join } from 'path';

const app = express();
app.use(cors());

var usersConectados = [];

let Ranking = [];

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

    socket.on('EnviarPuntuacion', (datos) => {
        console.log(datos);
        console.log(Ranking)
        // Buscar al usuario en el array 'Ranking'
        let user = Ranking.find(user => user.id === socket.id);

        // Si el usuario existe, actualizar su puntuación
        if (user) {
            user.puntuacion = datos.puntuacion;
        } else {
            // Si no existe, agregarlo al array con su puntuación
            Ranking.push({ id: socket.id, username: datos.username , puntuacion: datos.puntuacion });
        }

        // Ordenar el array 'Ranking' por puntuación en orden descendente
        Ranking.sort((a, b) => b.puntuacion - a.puntuacion);

        console.log(Ranking);
        // Emitir el array 'Ranking' a todos los clientes
        io.emit('RankingActualizado', Ranking);
    });

    socket.on('Nuevo usuario', (nuevoUsuario) => {
        console.log('Usuario conectado');
        console.log(socket.id);

        // Validación para evitar duplicados
        const usuarioExistente = usersConectados.find(user => user.username === nuevoUsuario);
        if (usuarioExistente) {
            console.error(`Usuario ${nuevoUsuario} ya existe. Elige otro nombre.`);
            return;
        }

        //hay que hacer un socket on solicitud_inicio que sea simplemente un 
        //emit a TODO EL MUNDO con el eventeo inicia_partida
        socket.on('solicitud_inicio', () => {
            console.log("Solicitud de inicio de partida");
            let contador = 6;
            let start = true;

            const intervalo = setInterval(() => {
                io.emit('cuenta_atras', contador);
                contador--;

                if (contador < 0) {
                    clearInterval(intervalo);
                    // resetamos el ranking
                    Ranking=[];
                    io.emit('inicio_partida');
                    io.emit('partida_iniciada'); // Emite un evento adicional cuando la partida comienza
                }
            }, 1000);
        });

        socket.on('solicitud_finPartida', () => {
            console.log("Solicitud de fin de partida");
            io.emit('fin_partida');
        });



        try {
            usersConectados.push({ id: socket.id, username: nuevoUsuario });
            //socket.broadcast.emit('usuarioConectado', usersConectados);
            io.emit('arrayUsers', usersConectados);

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
