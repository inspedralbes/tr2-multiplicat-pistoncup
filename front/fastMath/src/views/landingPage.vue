<template>
  <body>
    <div class="todo">
      <div class="formulari">
        <div>
          <label for="pilots">Selecciona un piloto de Fórmula Uno:</label>
          <select v-model="selectedPilot" id="pilots" name="pilots" size="1">
            <option v-for="pilot in fetchedData" :key="pilot.id" :value="pilot.pilot_name">
              {{ pilot.pilot_name }}
            </option>
          </select>
          <br>
          <button id="add_user" @click="unirmePartida" class="play-button">Jugar</button>
          <br>
          <button class="test-button" type="button">Prueba</button>
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
        this.$router.push('/pantallaJoc');
        socket.emit('Nuevo usuario', this.selectedPilot); // Envía el piloto seleccionado
        socket.emit("add_user");
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
  background-image: url("https://media.istockphoto.com/id/1214704318/es/vector/habitaci%C3%B3n-en-blanco-y-negro.jpg?s=612x612&w=0&k=20&c=-s2L7kc5FGJliczGY-RPVqwfK5j85ZIsQqYRqh1vuTA=");
  background-repeat: no-repeat;
  background-size: cover;
}

.formulari {
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  /* Fondo blanco algo opaco */
  border-radius: 15px;
  /* Bordes redondos */
  border: 2px solid #555;
  /* Borde gris oscuro */
  width: 300px;
  /* Ancho del formulario */
  margin: auto;
  margin-top: 25vh;
}

label {
  display: block;
  margin-bottom: 10px;
}

select {
  width: 100%;
  padding: 8px;
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
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
  width: 100%;
  /* Ancho del botón al 100% */
}

.test-button {
  background-color: rgb(100, 94, 94);
  color: white;
  border: none;
  padding: 15px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
  width: 100%;
  /* Ancho del botón al 100% */
}
</style>