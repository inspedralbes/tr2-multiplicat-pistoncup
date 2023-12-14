<template>
  <body>
    <div class="todo">
      <div class="formulari">
        <div>
          <h1>INICIAR SESIÓ</h1>
          <form @submit.prevent="iniciarSesion">
            <label for="username">usuari:</label>
            <input v-model="username" type="text" id="username" name="username" required>
            <br>
            <label for="password">contrasenya:</label>
            <input v-model="password" type="password" id="password" name="password" required>
            <br>
            <button type="submit" class="play-button">Iniciar Sesión</button>
          </form>

          <p>¿No tienes cuenta aún? <button @click="irRegistro" class="test-button" type="button">Registrar</button></p>
        </div>
      </div>
    </div>
  </body>
</template>
  
<script>
import { socket } from '../socket.js'
export default {
  name: 'loginPage',
  data() {
    return {
      username: '',
      password: '',
      fetchedData: [], // Agrega esta línea para almacenar los datos de los pilotos
    }
  },
  methods: {
    iniciarSesion() {
      // Agrega lógica de autenticación según tus necesidades
      if (this.username && this.password) {
        console.log(`Iniciando sesión como ${this.username}`);
        this.$router.push('/waitingRoom');
        socket.emit('Nuevo usuario', this.username); // Envía el nombre de usuario
        socket.emit('add_user');
      } else {
        console.error('Por favor, ingresa un nombre de usuario y una contraseña.');
      }
    },
    irRegistro() {
      this.$router.push('/pantallaPrueba');
    },
    unirmePartida() {
      if (this.selectedPilot) {
        this.$router.push('/waitingRoom');
        socket.emit('Nuevo usuario', this.selectedPilot); // Envía el piloto seleccionado
        socket.emit("add_user");
      } else {
        console.error('Por favor, selecciona un piloto antes de jugar.');
      }
    },
    unirmePrueba() {
      if (this.selectedPilot) {
        this.$router.push('/pantallaPrueba');
      } else {
        console.error('Por favor, selecciona un piloto antes de jugar.');
      }
    },
    onMounted() {
      fetch('http://127.0.0.1:8000/api/pilots')
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error de red - ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          this.fetchedData = data;
          // No estoy seguro de para qué se usa startAutoNextTimer(), puedes quitarlo si no es necesario
        })
        .catch(error => {
          console.error('Error al obtener el JSON:', error);
        });
    },
  },
  mounted() {


    this.onMounted();
  },
}
</script>
  
<style scoped>
body {

  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;

  /* Elimina el margen predeterminado del body */
}

.todo {
  width: 100%;
  height: 100%;
  background-image: url("../views/img/landingGif.gif");
  background-repeat: no-repeat;
  background-size: cover;
}

.formulari img {
  margin-top: -40px;
  width: 100%;
  height: 100%;
  margin-bottom: -30px;
}

.formulari {
  padding: 20px;
  background-color: rgba(97, 97, 97, 0.89);
  /* Fondo blanco algo opaco */
  border-radius: 15px;
  /* Bordes redondos */
  border: 2px solid #f70707;
  /* Borde gris oscuro */
  width: 370px;
  /* Ancho del formulario */
  margin: auto;
  margin-top: 13.5vh;
}

h1{
  text-align: center;
  font-size: 2.1em;
  font-weight: bold;
  font-variant: small-caps;
}

label {
  display: block;
  margin-bottom: 10px;
  color: white;
  font-size: 2.1em;
  font-weight: bold;
  font-variant: small-caps;
}

input {
  width: 100%;
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

select {
  width: 100%;
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.play-button {
  background-color: red;
  color: white;
  border: none;
  padding: 15px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  font-weight: bold;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
  width: 100%;
  border: 2px solid rgb(145, 3, 3);
  /* Ancho del botón al 100% */
}

.test-button {
  background-color: rgb(151, 150, 150);
  color: white;
  border: none;
  padding: 15px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  font-weight: bold;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
  width: 100%;
  border: 2px solid rgb(48, 48, 48);
  /* Ancho del botón al 100% */
}
</style>