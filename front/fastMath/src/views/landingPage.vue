<template>
  <body>
    <div class="todo">
      <header>
        <a href="#" class="login-link">
          <img src="../views/img/logologin.jpg" alt="Login">
          <span class="tooltip">Login</span>
        </a>
      </header>
      <div class="formulari">
        <img src="../views/img/logo_fastmath_black.png  " alt="logoFastMath">
      
        <div>
          <label for="pilots">SELECCIONA UN PILOT:</label>
          <select v-model="selectedPilot" id="pilots" name="pilots" size="1">
            <option v-for="pilot in fetchedData" :key="pilot.id" :value="pilot.pilot_name">
              {{ pilot.pilot_name }}
            </option>
          </select>
          <br>
          <button id="add_user" @click="unirmePartida" class="play-button">Jugar</button>
          <br>
          <button @click="unirmePrueba" class="test-button" type="button">Prueba</button>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import { socket } from '../socket.js'
export default {
  name: 'landingPage',
  data() {
    return {
      selectedPilot: null, // Agrega esta línea para manejar el piloto seleccionado
      fetchedData: [], // Agrega esta línea para almacenar los datos de los pilotos
    }
  },
  methods: {
    unirmePartida() {
      if (this.selectedPilot) {
        this.$router.push('/waitingRoom');
        socket.emit('Nuevo usuario', this.selectedPilot); // Envía el piloto seleccionado
        socket.emit("add_user");
      } else {
        console.error('Por favor, selecciona un piloto antes de jugar.');
      }
    },
    unirmePrueba(){
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

header {
  padding: 30px;
  position: relative; /* Agrega posición relativa para que funcione el posicionamiento absoluto */
}

header img {
  position: absolute;
  top: 5px; 
  right: 10px; 
  width: 70px; 
  height: 70px; 
  border-radius: 10px;
}

.tooltip {
  position: absolute;
  top: 100%;
  right: 20px;
  transform: translateX(-50%);
  font-size: 20px;
  opacity: 0;
  transition: opacity 0.3s ease; /* Agrega una transición para suavizar el efecto */
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 7px;
  border-radius: 5px;
  pointer-events: none; /* Evita que el tooltip afecte a los eventos del enlace */
}

.login-link:hover .tooltip {
  opacity: 1;
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
  margin-top: 7vh;
}



label {
  display: block;
  margin-bottom: 10px;
  color: white;
  font-size: 2.1em;
  font-weight: bold;
  font-variant: small-caps;
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