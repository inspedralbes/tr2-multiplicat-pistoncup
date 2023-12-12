<template>
    <body>
        <div class="todo">
            <div class="container">
                <h1>Lista de usuarios conectados:</h1>
                <ul>
                    <li v-for="user in users" :key="user.id">{{ user.username }}</li>
                </ul>
                <button @click="unirmePartida" class="play-button">Començar partida</button>
            </div>
        </div>
    </body>
</template>
  
<script>
import { useAppStore } from '../stores/app.js';
import { socket } from '../socket.js';

export default {
    computed: {
        users() {
            const appStore = useAppStore();
            return appStore.connectedUsers;
        },
    },
    methods: {
        unirmePartida() {
            this.$router.push('/pantallaJoc');
        },
    },
    mounted() {
        const appStore = useAppStore();

        socket.on('arrayUsers', (users) => {
            // Actualiza la lista de usuarios en la tienda Pinia
            appStore.setUsers(users);
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
  