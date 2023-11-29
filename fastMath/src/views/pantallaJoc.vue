<script setup>
import { ref, onMounted } from 'vue';

// Variable para almacenar los datos obtenidos en el fetch
const url = '../../datos.json';

// Datos obtenidos del JSON
const fetchedData = ref(null);

// Índice de la pregunta actual
const currentQuestionIndex = ref(0);

// Variable para el temporizador automático
let autoNextTimer;

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
      
      // Inicia el temporizador automático
      startAutoNextTimer();
    })
    .catch(error => {
      console.error('Error al obtener el JSON:', error);
    });
});

// Método para iniciar el temporizador automático
function startAutoNextTimer() {
  // Reinicia el temporizador si ya está en marcha
  if (autoNextTimer) {
    clearTimeout(autoNextTimer);
  }

  // Configura el temporizador para avanzar a la siguiente pregunta después de 30 segundos
  autoNextTimer = setTimeout(() => {
    nextQuestion();
  }, 30000);
}

// Método para avanzar a la siguiente pregunta
function nextQuestion() {
  currentQuestionIndex.value += 1;
  
  // Inicia el temporizador automático para la siguiente pregunta
  startAutoNextTimer();
}
</script>

<template>
    
    <!-- Verifica si los datos han sido obtenidos -->
    <div class="granContenidor" v-if="fetchedData">
        <div class="canva">
          <h1>canva</h1>
          <canvas>
            
          </canvas>
        </div>

        <!-- Muestra la pregunta actual -->
        <div class="pregunta" v-if="currentQuestionIndex < fetchedData.preguntas.length">
          <h1>{{ `Pregunta ${currentQuestionIndex + 1}/${fetchedData.preguntas.length}` }}</h1>
          <h1>{{ fetchedData.preguntas[currentQuestionIndex].enunciado }}</h1>
          <img :src="fetchedData.preguntas[currentQuestionIndex].imagen" alt="">
          <div class="respostes">
            <!-- Itera sobre las respuestas y crea botones -->
            <button v-for="(respuesta, i) in fetchedData.preguntas[currentQuestionIndex].respuestas" :key="i" class="resposta" @click="() => readAnswer(i)">
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
</template>

<script>
export default {
  data() {
    return {
      respuestas: [] // Array para almacenar las respuestas seleccionadas
    };
  },
  methods: {
    // Método para leer la respuesta seleccionada
    readAnswer(respuestaIndex) {
      const preguntaIndex = currentQuestionIndex.value;
      const pregunta = fetchedData.value.preguntas[preguntaIndex].enunciado;
      const respuesta = fetchedData.value.preguntas[preguntaIndex].respuestas[respuestaIndex].opcion;
      
      // Guarda la pregunta y respuesta seleccionada en el array respuestas
      this.respuestas.push({ pregunta, respuesta });
      
      // Muestra el array por consola
      console.log(this.respuestas);
    }
  }
};
</script>
