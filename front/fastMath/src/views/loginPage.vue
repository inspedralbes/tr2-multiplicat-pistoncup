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
            <button type="submit" @click="iniciarSesion" class="play-button">Iniciar Sesió</button>
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
    };
  },
  methods: {
    iniciarSesion() {
      // Agrega lógica de autenticación según tus necesidades
      if (this.username && this.password) {
        const credentials = {
          username: this.username,
          password: this.password,
        };

        fetch('http://localhost:8000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Error al iniciar sesión.');
            }
            return response.json();
          })
          .then(jsonData => {
            const data = jsonData.data;
            if (data.error === 1) {
              console.error('Error al iniciar sesión:', data.missatge);
              // Puedes manejar el error en tu aplicación, por ejemplo, mostrando un mensaje al usuario.
            } else {
              // Manejar el éxito del inicio de sesión, por ejemplo, almacenar el token en localStorage.
              localStorage.setItem('token', data.token);
              console.log('Inicio de sesión exitoso');
              // Redirigir a la página deseada, por ejemplo:
              this.$router.push('/waitingRoom');
              // Puedes emitir eventos al socket si es necesario.
              socket.emit('Nuevo usuario', this.username);
              socket.emit('add_user');
            }
          })
          .catch(error => {
            console.error('Error al iniciar sesión:', error);
          });
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