<script setup>
import { ref, onMounted } from 'vue';

// Variable para almacenar los datos obtenidos en el fetch
const url = '../../datos.json';

// Datos obtenidos del JSON
const fetchedData = ref(null);

// Índice de la pregunta actual
const currentQuestionIndex = ref(0);

// Realizar la solicitud Fetch
onMounted(() => {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error de red - ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Almacena los datos en la variable fetchedData
      fetchedData.value = data;
    })
    .catch(error => {
      console.error('Error al obtener el JSON:', error);
    });
});
</script>

<template>
  <div>
    <nav class="navbar">
      <ul>
        <li><router-link to="/">Inicio</router-link></li>
        <li><router-link to="/contacto">Contacto</router-link></li>
      </ul>
    </nav>
    <h1>hola</h1>

    <!-- Verifica si los datos han sido obtenidos -->
    <div v-if="fetchedData">
      <div class="granContenidor">
        <div class="canva">
          <canvas>
            <!-- Puedes añadir contenido al canvas si es necesario -->
          </canvas>
        </div>

        <!-- Muestra la pregunta actual -->
        <div class="pregunta" v-if="currentQuestionIndex < fetchedData.preguntas.length">
          <h1>{{ `Pregunta ${currentQuestionIndex + 1}/${fetchedData.preguntas.length}` }}</h1>
          <h1>{{ fetchedData.preguntas[currentQuestionIndex].enunciado }}</h1>
          <img :src="fetchedData.preguntas[currentQuestionIndex].imagen" alt="">
          <div class="respostes">
            <!-- Itera sobre las respuestas y crea botones -->
            <button v-for="(respuesta, i) in fetchedData.preguntas[currentQuestionIndex].respuestas" :key="i" class="resposta">
              {{ respuesta.opcion }}
            </button>
          </div>
          
          <!-- Botón para pasar a la siguiente pregunta -->
          <button @click="nextQuestion">Siguiente Pregunta</button>
        </div>

        <!-- Mensaje de fin cuando se han mostrado todas las preguntas -->
        <div v-else>
          <h1>¡Fin del cuestionario!</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // Método para avanzar a la siguiente pregunta
    nextQuestion() {
      currentQuestionIndex.value += 1;
    }
  }
};
</script>