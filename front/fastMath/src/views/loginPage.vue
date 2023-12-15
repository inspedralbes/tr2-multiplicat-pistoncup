<template>
  <body>
    <div class="todo">
      <div class="formulari">
        <div>
          <h1>INICIAR SESIÓN</h1>
          <form @submit.prevent="iniciarSesion">
            <label for="email">Correo electrónico:</label>
            <input v-model="email" type="email" id="email" name="email" required>
            <br>
            <label for="password">Contraseña:</label>
            <input v-model="password" type="password" id="password" name="password" required>
            <br>
            <button type="submit" class="play-button">Iniciar Sesión</button>
          </form>

          <p>¿No tienes cuenta aún? <button @click="irRegistro" class="test-button" type="button">Registrar</button></p>
          <button @click="irLanding" class="tornar-button" type="button">Tornar</button>
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
      email: '',
      password: '',
    };
  },
  methods: {
    iniciarSesion() {
      if (this.email && this.password) {
        const credentials = {
          email: this.email,
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
            } else {
              localStorage.setItem('token', data.token);
              console.log('Inicio de sesión exitoso');
              this.$router.push('/waitingRoom');
              socket.emit('Nuevo usuario', this.email);
              socket.emit('add_user');
            }
          })
          .catch(error => {
            console.error('Error al iniciar sesión:', error);
          });
      } else {
        console.error('Por favor, ingresa un correo electrónico y una contraseña.');
      }
    },
    irRegistro() {
      this.$router.push('/pantallaPrueba');
    },
    irLanding() {
      this.$router.push('/');
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

.tornar-button {
  background-color: rgb(255, 253, 253);
  color: rgb(0, 0, 0);
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