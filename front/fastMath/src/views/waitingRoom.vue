<template>
    <body>
        <div class="todo">
            <div class="container">
                <h1>Lista de usuarios conectados:</h1>
                <!-- Usa la propiedad mostrarImagen para determinar qué imagen mostrar -->
                <img :src="mostrarImagen ? 'img/semaforo.gif' : 'otraImagen.png'" alt="" width="400">
                
                <ul>
                    <li v-for="user in users" :key="user.id">{{ user.username }}</li>
                </ul>
                <button v-if="isUserAuthenticated && !mostrarImagen" @click="unirmePartida" class="play-button">Començar partida</button>
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
            mostrarImagen: false, // Nueva propiedad para determinar qué imagen mostrar
        };
    },
    computed: {
        users() {
            const appStore = useAppStore();
            return appStore.connectedUsers;
        },
        isUserAuthenticated() {
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
        socket.on('cuenta_atras', () => {
            console.log('Recibido evento de contador');
            // Cambia el valor de mostrarImagen a true cuando se recibe el evento 'cuenta_atras'
            this.mostrarImagen = true;
        });

        socket.on('partida_iniciada', () => {
            console.log('Recibido evento de inicio de partida');
            // Cambia el valor de mostrarImagen a true cuando se recibe el evento 'partida_iniciada'
            this.mostrarImagen = true;
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
}
</style>
