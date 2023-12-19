<template>
    <body>
        <div class="todo">
            <div class="container">
                <h1>Lista de usuarios conectados:</h1>
                <h1>{{ contador }}</h1>
                <ul>
                    <li v-for="user in users" :key="user.id">{{ user.username }}</li>
                </ul>
                <button v-if="isUserAuthenticated" @click="unirmePartida" class="play-button">Començar
                    partida</button>
            </div>
        </div>
    </body>
</template>
  
<script>
import { useAppStore } from '../stores/app.js';
import { socket } from '../socket.js';

export default {
    name: 'waitingRoom',
    data() {
        return {
            contador: 5,
        };
    },
    computed: {
        users() {
            const appStore = useAppStore();
            return appStore.connectedUsers;
        },
        isUserAuthenticated() {
            // Verificar si el usuario está autenticado y tiene el rol de profesor según localStorage
            const user = JSON.parse(localStorage.getItem('user'));
            return user !== null && user.role === 'profesor';
        },
    },
    methods: {
        unirmePartida() {
            console.log('Enviando solicitud de inicio');
            socket.emit('solicitud_inicio');
        },
    },
    mounted() {
        socket.on('cuenta_atras', (contador) => {
            console.log('Recibido evento de contador');
            this.contador = contador;
        });

        socket.on('inicio_partida', () => {
            console.log('Recibido evento de inicio de partida');
            // Redirigir solo si el usuario está autenticado y tiene el rol de profesor

            this.$router.push('/pantallaJoc');

        });
    },
};
</script>
  
<style scoped>
body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-color: #000000;
    color: #ffffff;
}

.todo {
    width: 100%;
    height: 100%;
    background-image: url("../views/img/waitingRoomGif.gif");
    background-repeat: no-repeat;
    background-size: cover;
}

/* Estilos para el componente WaitingRoom */
.container {
    padding: 20px;
    margin: 50px auto;
    max-width: 600px;
    background-color: #808080;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    text-align: center;
    border: 3px solid red;
}

h1 {
    color: #ffffff;
}

div ul {
    list-style-type: none;
    padding: 0;
    margin-top: 20px;
}

ul li {
    margin: 5px 0;
    font-size: 18px;
    font-weight: bold;
}



.play-button {
    background-color: red;
    color: white;
    border: none;
    padding: 15px 20px;
    text-align: center;
    text-decoration: none;
    font-weight: bold;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 8px;
    width: 100%;
    /* Ancho del botón al 100% */
}
</style>
  